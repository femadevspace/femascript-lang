import { Lexer } from "chevrotain";
import { getTokens } from "../lexer";

const lexer = new Lexer(getTokens(), {
  ensureOptimizations: true,
  positionTracking: "onlyOffset",
  skipValidations: !!process && process.env.NODE_ENV === "production",
});

export { lexer };
