import type { VisitedNode } from "@/formatter/formatter";
import { LineComment } from "@/grammar/lexer/tokens";
import type { IToken } from "chevrotain";
import { formatBlockComment } from "./block";
import { formatLineComment } from "./line";

export const formatComment = (comment: IToken): VisitedNode => {
  if (comment.tokenType.name === LineComment.name)
    return formatLineComment(comment);

  return formatBlockComment(comment);
};
