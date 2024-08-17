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
  pattern: /\b(rea((l[s]?)|is))\b/,
  categories: [PrimitiveTypes],
  textmateScope,
});

export const IntegerType = TOKEN({
  name: "IntegerType",
  pattern: /\b(int((eger[s]?)|(eiro[s]?))?)\b/,
  categories: [PrimitiveTypes],
  textmateScope,
});

export const CharType = TOKEN({
  name: "CharType",
  pattern: /\b(((char(acter)?)|caractere)[s]?)\b/,
  categories: [PrimitiveTypes],
  textmateScope,
});

export const TextType = TOKEN({
  name: "TextType",
  pattern: /\b((string|text[o]?)[s]?)\b/,
  categories: [PrimitiveTypes],
  textmateScope,
});

export const BooleanType = TOKEN({
  name: "BooleanType",
  pattern: /\b((bool(ean[o]?)?[s]?)|(logic((al|o)[s]?)?)|lógico[s]?)\b/,
  categories: [PrimitiveTypes],
  textmateScope,
});

export const ArrayType = TOKEN({
  name: "ArrayType",
  pattern: /\b(arra(y|njo)|list[a]?|matri[x|z])\b/,
  textmateScope,
});

export const OfType = TOKEN({
  name: "Of",
  pattern: /\b(of|de)\b/,
  textmateScope,
});

export const EnumType = TOKEN({
  name: "Enum",
  pattern: /\b(enum(era([çc][ãa]o|te))?)\b/,
  textmateScope: "storage.type.enum",
});
