import type { TokenConfig } from "@/grammar/lexer";

/**
 * This follows the schema of Textmate's grammar JSON.
 * The schema can be found at https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json
 *
 * @property `repository` - If there is no explicit repository specified,
 * it defaults to the word that precedes the first dot (".") in the `name` property.
 */
export type TextmatePattern = {
  repository?: string;
  name: string;
  patterns?: TextmatePattern[];
  match?: string;
  comment?: string;
  disabled?: 0 | 1;
  include?: string;
  contentName?: string;
  begin?: string;
  end?: string;
  while?: string;
  applyEndPatternLast?: 0 | 1;
};

export type WithTextmateScope = { textmateScope: string | TextmatePattern };
export type SkipTextmateScope = { skipTextmateScope: true };
export type MaybeTextmateScoped = WithTextmateScope | SkipTextmateScope;

export const handleTextmateScope = (config: TokenConfig): MaybeTextmateScoped =>
  "skipTextmateScope" in config
    ? { skipTextmateScope: true }
    : { textmateScope: config.textmateScope };
