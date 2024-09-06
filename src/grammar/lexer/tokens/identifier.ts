import { createAndRegisterToken as TOKEN } from "../tokens-registry";
import { PrimitiveTypes } from "./types";

export const Identifier = TOKEN({
  name: "Identifier",
  pattern: /[a-zA-Z$_][a-zA-Z0-9$_]*/,
  textmateScope: "variable.other",
  categories: [PrimitiveTypes],
});
