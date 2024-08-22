import type { IToken } from "chevrotain";
import type { Comment } from ".";

export const convertedToCommentType = (
  comments: IToken[]
): comments is Comment[] =>
  comments.every((comment) => "extendedOffset" in comment);
