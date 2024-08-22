import type { IToken } from "chevrotain";
import type {
  Comment,
  CommentsByExtendedRange,
  CommentsExtendedOffsetMap,
  TokenWithComments,
} from ".";

export const extendRangeOffset = (
  rawComments: IToken[],
  tokens: TokenWithComments[]
) => {
  let position: number;
  const comments = rawComments as Comment[];

  comments.forEach((comment) => {
    position = findUpperBoundToken(tokens, comment);

    const extendedStartOffset =
      position - 1 < 0 ? comment.startOffset : tokens[position - 1].endOffset!;

    const extendedEndOffset =
      position == tokens.length
        ? comment.endOffset!
        : tokens[position].startOffset!;

    comment.extendedOffset = {
      startOffset: extendedStartOffset,
      endOffset: extendedEndOffset,
    };
  });
};

/**
 * Search where is the position of the comment in the token array by
 * using dichotomic search.
 *
 * @return the position of the token next to the comment
 */
const findUpperBoundToken = (tokens: TokenWithComments[], comment: Comment) => {
  let diff: number;
  let i: number;
  let current: number;

  let len = tokens.length;
  i = 0;

  while (len) {
    diff = len >>> 1;
    current = i + diff;
    if (tokens[current].startOffset > comment.startOffset) {
      len = diff;
    } else {
      i = current + 1;
      len -= diff + 1;
    }
  }

  return i;
};

/**
 * Create two data structures used to know at which offset a comment can be attached.
 * - commentsByExtendedStartOffset: map a comment by the endOffset of the previous token.
 * - commentsByExtendedEndOffset: map a comment by the startOffset of the next token
 */
export const mapCommentsByExtendedRange = (
  comments: Comment[]
): CommentsByExtendedRange => {
  const commentsByExtendedEndOffset: CommentsExtendedOffsetMap = {};
  const commentsByExtendedStartOffset: CommentsExtendedOffsetMap = {};

  comments.forEach((comment) => {
    const extendedStartOffset = comment.extendedOffset.startOffset;
    const extendedEndOffset = comment.extendedOffset.endOffset;

    if (commentsByExtendedEndOffset[extendedEndOffset] === undefined) {
      commentsByExtendedEndOffset[extendedEndOffset] = [comment];
    } else {
      commentsByExtendedEndOffset[extendedEndOffset].push(comment);
    }

    if (commentsByExtendedStartOffset[extendedStartOffset] === undefined) {
      commentsByExtendedStartOffset[extendedStartOffset] = [comment];
    } else {
      commentsByExtendedStartOffset[extendedStartOffset].push(comment);
    }
  });

  return { commentsByExtendedEndOffset, commentsByExtendedStartOffset };
};
