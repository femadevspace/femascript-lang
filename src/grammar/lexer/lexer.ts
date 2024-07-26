import { Lexer } from "chevrotain";
import { tokensRegistry } from "../lexer";

const lexer = new Lexer(tokensRegistry.getAllTokens(), {
  ensureOptimizations: true,
  positionTracking: "onlyOffset",
  skipValidations: !!process && process.env.NODE_ENV === "production",
});

export { lexer };
