import { makePattern } from "../fragments.registry";
import { add as TOKEN } from "../tokens.registry";

export const NumberLiteral = TOKEN({
  name: "NumberLiteral",
  pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/,
  textmateScope: "constant.numeric",
});

export const StringLiteral = TOKEN({
  name: "StringLiteral",
  pattern: makePattern("{{string1}}|{{string2}}"),
  textmateScope: "string",
});
