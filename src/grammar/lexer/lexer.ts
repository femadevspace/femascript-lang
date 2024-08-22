import { getTokens } from "@/grammar";
import { Lexer } from "chevrotain";

const lexer = new Lexer(getTokens(), {
  ensureOptimizations: true,
  skipValidations: !!process && process.env.NODE_ENV === "production",
});

export { lexer };
