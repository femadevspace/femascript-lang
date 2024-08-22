import type { EnclosiveNodes, TokenWithComments } from ".";

export const preProcessNodeStructure = (
  tokens: TokenWithComments[],
  byStartOffset: EnclosiveNodes,
  byEndOffset: EnclosiveNodes
) => {
  tokens.forEach((token) => {
    if (byStartOffset[token.startOffset] === undefined) {
      byStartOffset[token.startOffset] = token;
    }

    if (token.endOffset && byEndOffset[token.endOffset] === undefined) {
      byEndOffset[token.endOffset] = token;
    }
  });
};
