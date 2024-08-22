/**
 * This utility function and all helpers was
 * inspired by and uses parts of the original
 * code gracefully available under the Apache 2.0 license.
 *
 * Original code: @link https://github.com/jhipster/prettier-java/blob/main/packages/java-parser/src/comments.js
 */

import type { CstElement, CstNode, IToken } from "chevrotain";
import {
  attachCommentsAsTrailing,
  attachRemainingCommentsAsLeading,
} from "./attach-comments";
import { extendRangeOffset, mapCommentsByExtendedRange } from "./extend-range";
import { preProcessNodeStructure } from "./pre-process";
import { convertedToCommentType } from "./type-guard";

export type WithComment = {
  leadingComments?: IToken[];
  trailingComments?: IToken[];
};

export type CstNodeWithComments = CstNode & WithComment;
export type TokenWithComments = IToken & WithComment;
export type CstElementWithComments = CstNodeWithComments | TokenWithComments;

export type Comment = TokenWithComments & {
  extendedOffset: {
    startOffset: number;
    endOffset: number;
  };
};

export type CommentsByExtendedRange = {
  commentsByExtendedStartOffset: CommentsExtendedOffsetMap;
  commentsByExtendedEndOffset: CommentsExtendedOffsetMap;
};
export type CommentsExtendedOffsetMap = Record<number, Comment[]>;
export type EnclosiveNodes = Record<number, CstElement & WithComment>;

export const attachComments = (
  tokens: IToken[],
  comments: IToken[],
  mostEnclosiveCstNodeByStartOffset: EnclosiveNodes,
  mostEnclosiveCstNodeByEndOffset: EnclosiveNodes
) => {
  const isFileOnlyWithComments = tokens.length === 0;

  if (isFileOnlyWithComments) {
    mostEnclosiveCstNodeByStartOffset[NaN].leadingComments = comments;
    return;
  }

  preProcessNodeStructure(
    tokens,
    mostEnclosiveCstNodeByStartOffset,
    mostEnclosiveCstNodeByEndOffset
  );

  extendRangeOffset(comments, tokens);

  if (!convertedToCommentType(comments))
    throw new Error("Comments were not converted to Comment type");

  const { commentsByExtendedStartOffset, commentsByExtendedEndOffset } =
    mapCommentsByExtendedRange(comments);

  /**
   * This `set` ensures that the comments are attached only once.
   */
  const commentsToAttach = new Set(comments);

  attachCommentsAsTrailing(
    mostEnclosiveCstNodeByStartOffset,
    mostEnclosiveCstNodeByEndOffset,
    commentsByExtendedStartOffset,
    commentsToAttach
  );

  attachRemainingCommentsAsLeading(
    mostEnclosiveCstNodeByStartOffset,
    commentsByExtendedEndOffset,
    commentsToAttach
  );
};
