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
  let lastStatementType = null;

  for (const statement of statements) {
    const currentStatementType = getStatementType(statement);

    if (shoudGroup(lastStatementType, currentStatementType)) {
      lastStatementType = currentStatementType;
      currentGroup.push(statement);
    } else {
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

const shoudGroup = (lastType: string | null, currentType: string) => {
  /**
   * Certain rules for statements involve grouping similar types of statements together.
   * For instance, the 'operationsStatement' rule groups both 'print' and 'read' operations.
   * Although 'print' and 'read' are grouped, they are distinct from each other.
   * Consequently, when comparing 'lastType' with 'currentType', they should be treated as different.
   *
   * TODO: Implement checking for nested statements.
   */

  const isGroupableType = [currentType === "assignmentStatement"].some(Boolean);

  if (lastType === null) return isGroupableType;
  if (lastType !== currentType) return false;
  if (lastType === currentType) return isGroupableType;

  return isGroupableType;
};
