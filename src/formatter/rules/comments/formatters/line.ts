import type { VisitedNode } from "@/formatter/formatter";
import { COMMENT_BREAKS } from "@/formatter/utils/comments-breaks";
import type { IToken } from "chevrotain";

export const formatLineComment = (comment: IToken): VisitedNode => {
  const breakLineOccurrences = comment.image.match(/(\r?\n)/g)?.length ?? 0;

  return [comment.image.trim(), COMMENT_BREAKS(breakLineOccurrences)];
};
