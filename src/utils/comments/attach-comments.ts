import type { CstElement, IToken } from "chevrotain";
import type { Comment, CommentsExtendedOffsetMap, EnclosiveNodes } from ".";

export const attachCommentsAsTrailing = (
  byStartOffset: EnclosiveNodes,
  byEndOffset: EnclosiveNodes,
  byExtendedStartOffset: CommentsExtendedOffsetMap,
  commentsToAttach: Set<Comment>
) => {
  Object.keys(byEndOffset)
    .map(Number)
    .forEach((endOffset) => {
      // Check if some comments is directly following this node/token
      if (!byExtendedStartOffset[endOffset]) return;

      const nodeTrailingComments = byExtendedStartOffset[endOffset].filter(
        (comment) =>
          shouldAttachTrailingComments(
            comment,
            byEndOffset[endOffset],
            byStartOffset
          ) && commentsToAttach.has(comment)
      );

      if (nodeTrailingComments.length > 0) {
        byEndOffset[endOffset].trailingComments = nodeTrailingComments;
      }

      nodeTrailingComments.forEach((comment) =>
        commentsToAttach.delete(comment)
      );
    });
};

/**
 * A comment should be trailing if:
 * - it is on the same line than the previous token
 * - and not on the same line than the next token
 */
const shouldAttachTrailingComments = (
  comment: Comment,
  node: CstElement,
  byStartOffset: EnclosiveNodes
) => {
  const nextNode = byStartOffset[comment.extendedOffset.endOffset];

  const isLastNode = nextNode === undefined;
  if (isLastNode) return true;

  const nodeEndLine =
    "location" in node ? node.location?.endLine : (node as IToken).endLine;

  if (comment.startLine !== nodeEndLine) return false;

  const nextNodeStartLine =
    "location" in nextNode
      ? nextNode.location?.startLine
      : (nextNode as IToken).startLine;
  return comment.endLine !== nextNodeStartLine;
};

export const attachRemainingCommentsAsLeading = (
  byStartOffset: EnclosiveNodes,
  byExtendedEndOffset: CommentsExtendedOffsetMap,
  commentsToAttach: Set<Comment>
) =>
  Object.keys(byStartOffset)
    .map(Number)
    .forEach((startOffset) => {
      // Check if some comments is directly preceding this node/token
      if (!byExtendedEndOffset[startOffset]) return;

      const nodeLeadingComments = byExtendedEndOffset[startOffset].filter(
        (comment) => commentsToAttach.has(comment)
      );

      if (nodeLeadingComments.length > 0) {
        byStartOffset[startOffset].leadingComments = nodeLeadingComments;
      }
    });
