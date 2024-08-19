import type { VisitedNode } from "../formatter";
import { BRK_ALLMAN, BRK_KR, BRK_LN } from "./breaklines";
import {
  D_INDT_ALLMAN,
  D_INDT_KR,
  I_INDT_ALLMAN,
  I_INDT_KR,
} from "./indentation";
import { WS_COMPACT } from "./whitespaces";

export const BLOCK = (content: VisitedNode) => [
  [
    [BRK_ALLMAN],
    "{",
    [WS_COMPACT],
    [I_INDT_KR, BRK_KR],
    [I_INDT_ALLMAN, BRK_ALLMAN],
  ],
  content,
  [[D_INDT_KR, D_INDT_ALLMAN], [BRK_LN], "}"],
];