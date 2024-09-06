import { imageFrom } from "@/utils";
import { IToken } from "chevrotain";
import type { VisitedNode } from "../formatter";
import { BRK_ALLMAN, BRK_KR, BRK_LN } from "./breaklines";
import {
  D_INDT_ALLMAN,
  D_INDT_KR,
  I_INDT_ALLMAN,
  I_INDT_KR,
  POP_ALIGN_COMPACT,
  PUSH_ALIGN_COMPACT,
} from "./indentation";
import { WS_COMPACT } from "./whitespaces";

export const BLOCK = (
  leftCurly: IToken[],
  content: VisitedNode,
  rightCurly: IToken[]
): VisitedNode => [
  [
    [BRK_ALLMAN, PUSH_ALIGN_COMPACT],
    imageFrom(leftCurly),
    [WS_COMPACT, PUSH_ALIGN_COMPACT],
    [I_INDT_KR, BRK_KR],
    [I_INDT_ALLMAN, BRK_ALLMAN],
  ],
  content,
  [
    [POP_ALIGN_COMPACT],
    [D_INDT_KR, D_INDT_ALLMAN],
    [BRK_LN],
    imageFrom(rightCurly),
    [POP_ALIGN_COMPACT],
  ],
];
