import type { TokenConfig } from "@/grammar";
import type { IToken, TokenType } from "chevrotain";

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

export const imageFrom = (tokens: IToken[] | undefined) =>
  tokens ? tokens[0].image : null;

export const imagesFrom = (tokens: IToken[] | undefined) =>
  tokens ? tokens.map(({ image }) => image) : null;
