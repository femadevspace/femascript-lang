import { add as TOKEN } from "../tokens.registry";

export const Identifier = TOKEN({
  name: "Identifier",
  pattern: /[a-zA-Z$_][a-zA-Z0-9$_]*/,
  textmateScope: "variable",
});