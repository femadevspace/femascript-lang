import { Lexer } from "chevrotain";
import { createAndRegisterToken as TOKEN } from "../tokens-registry";

export const True = TOKEN({
  name: "True",
  pattern: /\b(true|verdadeiro)/,
  textmateScope: "constant.language.boolean.true",
});

export const False = TOKEN({
  name: "False",
  pattern: /\b(false|falso)/,
  textmateScope: "constant.language.boolean.false",
});

export const BooleanValues = TOKEN({
  name: "BooleanValues",
  pattern: Lexer.NA,
  categories: [True, False],
  skipTextmateScope: true,
});

export const Null = TOKEN({
  name: "Null",
  pattern: /\b(null|nulo)/,
  textmateScope: "constant.language.null",
});

export const Not = TOKEN({
  name: "Not",
  pattern: /\b(not|nao|não)/,
  label: "'not'",
  textmateScope: "keyword.operator.logical",
});
