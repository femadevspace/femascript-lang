import { Lexer } from "chevrotain";
import { makePattern } from "../fragments.registry";
import { createAndRegisterToken as TOKEN } from "../tokens-registry";

export const Literal = TOKEN({
  name: "Literal",
  pattern: Lexer.NA,
  skipTextmateScope: true,
});

export const BooleanLiteral = TOKEN({
  name: "BooleanLiteral",
  pattern: Lexer.NA,
  categories: [Literal],
  skipTextmateScope: true,
});

export const NumberLiteral = TOKEN({
  name: "NumberLiteral",
  pattern: /(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/,
  categories: [Literal],
  textmateScope: "constant.numeric",
});

export const StringLiteral = TOKEN({
  name: "StringLiteral",
  pattern: makePattern("{{string1}}|{{string2}}"),
  categories: [Literal],
  textmateScope: {
    repository: "strings",
    name: "string.quoted.double",
    begin: '"',
    end: '"',
    patterns: [
      {
        name: "constant.character.escape",
        match: "\\\\.",
      },
    ],
  },
});

export const True = TOKEN({
  name: "True",
  pattern: /\b(true|verdadeiro)/,
  categories: [BooleanLiteral],
  textmateScope: "constant.language.boolean.true",
});

export const False = TOKEN({
  name: "False",
  pattern: /\b(fals[eo])/,
  categories: [BooleanLiteral],
  textmateScope: "constant.language.boolean.false",
});

export const Null = TOKEN({
  name: "Null",
  pattern: /\b(nul[lo])/,
  categories: [Literal],
  textmateScope: "constant.language.null",
});
