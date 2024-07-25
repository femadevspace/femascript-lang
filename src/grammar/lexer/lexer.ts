import { Lexer } from "chevrotain";
import { tokensRegistry } from "../lexer";

const lexer = new Lexer(tokensRegistry.getAllTokens(), {
  ensureOptimizations: true,
  positionTracking: "onlyOffset",
});

export { lexer };
