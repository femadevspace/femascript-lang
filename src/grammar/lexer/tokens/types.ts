import { Lexer } from "chevrotain";
import { createAndRegisterToken as TOKEN } from "../tokens-registry";

const textmateScope = "support.type.primitive";

export const PrimitiveTypes = TOKEN({
  name: "PrimitiveTypes",
  pattern: Lexer.NA,
  skipTextmateScope: true,
});

export const RealType = TOKEN({
  name: "RealType",
  pattern: /\b(real|reais)\b/,
  categories: [PrimitiveTypes],
  textmateScope,
});

export const IntegerType = TOKEN({
  name: "IntegerType",
  pattern: /\b(int|integer|integers|inteiro|inteiros)\b/,
  categories: [PrimitiveTypes],
  textmateScope,
});

export const CharType = TOKEN({
  name: "CharType",
  pattern: /\b(char|character|caractere)\b/,
  categories: [PrimitiveTypes],
  textmateScope,
});

export const TextType = TOKEN({
  name: "TextType",
  pattern: /\b(string|text|texto)\b/,
  categories: [PrimitiveTypes],
  textmateScope,
});

export const BooleanType = TOKEN({
  name: "BooleanType",
  pattern: /\b(bool|boolean|booleano|logical|logic|lógico|logico)\b/,
  categories: [PrimitiveTypes],
  textmateScope,
});

export const ArrayType = TOKEN({
  name: "ArrayType",
  pattern: /\b(array|arranjo|list|lista|matrix|matriz)\b/,
  textmateScope,
});

export const OfType = TOKEN({
  name: "Of",
  pattern: /\b(of|de)\b/,
  textmateScope,
});
