import type { VisitedNode } from "@/formatter/formatter";
import type { TokenWithComments } from "@/utils/comments";
import { printWithComments } from "./print";

export const printTokenWithComments = (token: TokenWithComments): VisitedNode =>
  printWithComments(token, [token.image]);
