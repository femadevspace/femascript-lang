import { Lexer } from "chevrotain";
import { createAndRegisterToken as TOKEN } from "../tokens-registry";

export const AssignmentOperator = TOKEN({
  name: "AssignmentOperator",
  pattern: Lexer.NA,
  skipTextmateScope: true,
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

export const MultiplicativeOperator = TOKEN({
  name: "MultiplicativeOperator",
  pattern: Lexer.NA,
  skipTextmateScope: true,
  categories: [ArithmeticOperator],
});

export const AdditiveOperator = TOKEN({
  name: "AdditiveOperator",
  pattern: Lexer.NA,
  skipTextmateScope: true,
  categories: [ArithmeticOperator],
});

export const RelationalOperator = TOKEN({
  name: "RelationalOperator",
  pattern: Lexer.NA,
  skipTextmateScope: true,
  categories: [BinaryOperator],
});

export const LogicalOperator = TOKEN({
  name: "LogicalOperator",
  pattern: Lexer.NA,
  skipTextmateScope: true,
  categories: [BinaryOperator],
});
