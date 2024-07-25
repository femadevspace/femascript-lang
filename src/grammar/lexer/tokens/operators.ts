import { Lexer } from "chevrotain";
import { add as TOKEN } from "../tokens.registry";
import { Minus, Plus, Slash, Star } from "./special-characters";

export const ArithmeticOperator = TOKEN({
  name: "ArithmeticOperator",
  pattern: Lexer.NA,
  label: "'arithmetic operator'",
  categories: [Star, Slash, Plus, Minus],
  skipTextmateScope: true,
});
