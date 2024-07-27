import { Lexer } from "chevrotain";
import { makePattern } from "../fragments.registry";
import { createAndRegisterToken as TOKEN } from "../tokens-registry";

export const Whitespace = TOKEN({
  name: "Whitespace",
  pattern: makePattern("{{space}}"),
  group: Lexer.SKIPPED,
  skipTextmateScope: true,
});

export const BlockComment = TOKEN({
  name: "BlockComment",
  pattern: makePattern("{{blockcomment}}"),
  group: Lexer.SKIPPED,
  skipTextmateScope: true,
});

export const LineComment = TOKEN({
  name: "LineComment",
  pattern: /(\/\/).*(\n|\r|\f)*/,
  group: Lexer.SKIPPED,
  skipTextmateScope: true,
});
