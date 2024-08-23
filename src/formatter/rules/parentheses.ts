import { imageFrom } from "@/utils";
import { IToken } from "chevrotain";
import { VisitedNode } from "../formatter";

export const PARENS = (
  leftParen: IToken[],
  content: VisitedNode,
  rightParen: IToken[]
) => [imageFrom(leftParen), content, imageFrom(rightParen)];
