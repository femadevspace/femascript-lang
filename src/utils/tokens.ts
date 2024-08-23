import { VisitedNode } from "@/formatter/formatter";
import { printTokenWithComments } from "@/formatter/rules/comments";
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

export const imageFrom = (tokens: IToken[] | undefined): VisitedNode =>
  tokens ? printTokenWithComments(tokens[0]) : [];

export const imagesFrom = (tokens: IToken[] | undefined): VisitedNode =>
  tokens ? tokens.map((token) => imageFrom([token])) : [];
