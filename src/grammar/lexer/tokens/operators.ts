import { Lexer } from "chevrotain";
import { createAndRegisterToken as TOKEN } from "../tokens-registry";

export const AssignmentOperator = TOKEN({
  name: "AssignmentOperator",
  pattern: Lexer.NA,
  textmateScope: "keyword.operator.assignment",
});

export const BinaryOperator = TOKEN({
  name: "BinaryOperator",
  pattern: Lexer.NA,
  skipTextmateScope: true,
});

export const UnaryPrefixOperator = TOKEN({
  name: "UnaryPrefixOperator",
  pattern: Lexer.NA,
  skipTextmateScope: true,
});

export const UnarySuffixOperator = TOKEN({
  name: "UnarySuffixOperator",
  pattern: Lexer.NA,
  skipTextmateScope: true,
});

export const ArithmeticOperator = TOKEN({
  name: "ArithmeticOperator",
  pattern: Lexer.NA,
  skipTextmateScope: true,
  categories: [BinaryOperator],
});

export const RelationalOperator = TOKEN({
  name: "ArithmeticOperator",
  pattern: Lexer.NA,
  skipTextmateScope: true,
  categories: [BinaryOperator],
});

export const LogicalOperator = TOKEN({
  name: "ArithmeticOperator",
  pattern: Lexer.NA,
  skipTextmateScope: true,
  categories: [BinaryOperator],
});
