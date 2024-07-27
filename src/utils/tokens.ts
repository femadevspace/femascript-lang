import type { TokenConfig } from "@/grammar/lexer";
import type { TokenType } from "chevrotain";

export const resolveCategories = (
  tokenCategories: TokenConfig["categories"],
  additionalCategories: TokenType[]
) => {
  if (!tokenCategories) return additionalCategories;

  const categories = Array.isArray(tokenCategories)
    ? tokenCategories
    : [tokenCategories];

  return categories.concat(additionalCategories);
};
