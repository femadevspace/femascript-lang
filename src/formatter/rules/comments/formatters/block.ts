import type { VisitedNode } from "@/formatter/formatter";
import { BRK_LN } from "@/formatter/rules/breaklines";
import { NONE, WS } from "@/formatter/rules/whitespaces";
import { COMMENT_BREAKS } from "@/formatter/utils/comments-breaks";
import type { IToken } from "chevrotain";

export const formatBlockComment = (comment: IToken): VisitedNode => {
  const lines = processBlockLines(comment);

  const breakLineOccurrences = lines.filter((line) => line === null).length;
  const BREAKS = COMMENT_BREAKS(breakLineOccurrences);

  const isEmptyBlock = lines.length - breakLineOccurrences === 0;
  const isSingleLine = lines.length - breakLineOccurrences === 1;

  if (isEmptyBlock) return ["/*", WS, "*/", BREAKS];
  if (isSingleLine) return ["/*", WS, lines[0]!, WS, "*/", BREAKS];

  const formattedLines = lines
    .filter((line) => line !== null)
    .map((line) => {
      const linePrefix = line.startsWith("* ") ? [WS] : [WS, "*", WS];

      return [linePrefix, line, [BRK_LN]];
    });

  return [["/**", BRK_LN], formattedLines, [WS, "*/"], BREAKS];
};

/**
 * This function processes a block comment by splitting it into lines and then
 * removing any delimiters and trimming whitespace. The resulting array may contain
 * null values at the end to represent line breaks.
 */
const processBlockLines = (comment: IToken): (string | null)[] => {
  let isClosed = false;
  const delimiters = new RegExp(/\/\*[\*]?|\*\//, "g");

  return comment.image
    .split("\n")
    .map((line) => {
      if (line.trim().endsWith("*/")) isClosed = true;

      if (isClosed && line.trim().length === 0) return null;

      return line.replace(delimiters, NONE).trim();
    })
    .filter((line) => line === null || line.length > 0);
};
