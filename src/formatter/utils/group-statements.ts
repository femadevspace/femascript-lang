import type { StatementCstNode } from "@/types/cst";
import { FemaScriptFormatterVisitor, VisitedNode } from "../formatter";
import { BRK_LN, SKIP_LN } from "../rules/breaklines";
import { NONE } from "../rules/whitespaces";
import { separateWith } from "./rules";

export const groupStatements = (
  statements: StatementCstNode[],
  visitor: FemaScriptFormatterVisitor
): VisitedNode => {
  const grouped: (StatementCstNode[] | StatementCstNode)[] = [];
  let currentGroup: StatementCstNode[] = [];

  for (const statement of statements) {
    const currentStatementType = getStatementType(statement);

    if (shoudGroup(currentStatementType)) currentGroup.push(statement);
    else {
      if (currentGroup.length > 0) {
        grouped.push(currentGroup);
        currentGroup = [];
      }

      grouped.push(statement);
    }
  }

  if (currentGroup.length > 0) {
    grouped.push(currentGroup);
    currentGroup = [];
  }

  return grouped.flatMap((value, i, origin) => {
    const isLast = origin.length - i === 1;
    const skipExceptLast = isLast ? NONE : SKIP_LN;

    if (Array.isArray(value))
      return [separateWith(BRK_LN, visitor.visit(value)), skipExceptLast];

    return [visitor.visit(value), skipExceptLast];
  });
};

const getStatementType = ({ children }: StatementCstNode) => {
  let type = null;

  for (const child of Object.values(children)) {
    if (!child) continue;
    type = child[0].name;
    break;
  }

  if (!type) throw new Error("Statement type not found");

  return type;
};

const shoudGroup = (currentType: string) =>
  [
    currentType === "assignmentStatement",
    currentType === "operationsStatements",
  ].some(Boolean);
