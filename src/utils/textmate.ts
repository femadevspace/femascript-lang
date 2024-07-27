import type { TokenConfig } from "@/grammar/lexer";

export type WithTextmateScope = { textmateScope: string };
export type SkipTextmateScope = { skipTextmateScope: true };
export type MaybeTextmateScoped = WithTextmateScope | SkipTextmateScope;

export const handleTextmateScope = (config: TokenConfig): MaybeTextmateScoped =>
  "skipTextmateScope" in config
    ? { skipTextmateScope: true }
    : { textmateScope: config.textmateScope };
