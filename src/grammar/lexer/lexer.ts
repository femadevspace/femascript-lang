import { Lexer } from "chevrotain";
import { getTokens } from ".";

const lexer = new Lexer(getTokens(), {
  ensureOptimizations: true,
  skipValidations: !!process && process.env.NODE_ENV === "production",
});

export { lexer };
