import { imageFrom } from "@/utils";
import { IToken } from "chevrotain";
import { VisitedNode } from "../formatter";
import { NONE, WS_ALLMAN, WS_KR } from "./whitespaces";

export const PARENS = (
  leftParen: IToken[],
  content: VisitedNode,
  rightParen: IToken[],
  trailingSpace = true
) => [
  imageFrom(leftParen),
  content,
  imageFrom(rightParen),
  trailingSpace ? [WS_KR, WS_ALLMAN] : NONE,
];
