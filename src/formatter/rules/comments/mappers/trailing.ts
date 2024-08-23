import type { VisitedNode } from "@/formatter/formatter";
import { NONE, WS } from "@/formatter/rules/whitespaces";
import type { CstElementWithComments } from "@/utils/comments";
import { formatComment } from "../formatters";

export const mapTrailingComments = ({
  trailingComments,
}: CstElementWithComments): VisitedNode => {
  if (!trailingComments) return [];

  let lastEndLine: number | undefined;

  return trailingComments.map((comment, index) => {
    const isFirst = index === 0;
    const sameLineAsLast = lastEndLine === comment.startLine;
    const LEADING_WS = isFirst || sameLineAsLast ? WS : NONE;

    lastEndLine = comment.endLine;

    return [LEADING_WS, formatComment(comment)];
  });
};
