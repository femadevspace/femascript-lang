import { BRK_LN, SKIP_LN } from "../rules/breaklines";
import { NONE } from "../rules/whitespaces";

/**
 * There is an implicit rule to skip only one line
 * if there are more than one occurrences of line breaks
 * in a comment. This may be changed in the future
 * to allow passing a threshold via options.
 *
 * @param occurrences line break occurrences in a comment
 * @returns line break rule based on the number of occurrences
 */
export const COMMENT_BREAKS = (occurrences: number) =>
  occurrences === 1 ? BRK_LN : occurrences > 1 ? SKIP_LN : NONE;
