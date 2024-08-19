import { imageFrom } from "@/utils";
import type { CstNode, IToken } from "chevrotain";
import type { FemaScriptFormatterVisitor } from "../formatter";
import { WS } from "../rules/whitespaces";

export const binaryExpression = (
  expressions: CstNode[],
  operators: IToken[] | undefined,
  visitor: FemaScriptFormatterVisitor
) => {
  const left = visitor.visit(expressions[0]);

  if (!operators || expressions.length === 1) return [left];

  const right = expressions
    .slice(1)
    .map((e, i) => [WS, imageFrom([operators[i]]), WS, visitor.visit(e)]);

  return [left, right];
};
