import * as cst from "@/types/cst";
import { FemaScriptFormatterVisitor } from "../formatter";
import { BRK_ALLMAN, BRK_KR, BRK_LN } from "../rules/breaklines";
import {
  D_INDT_ALLMAN,
  D_INDT_KR,
  I_INDT_ALLMAN,
  I_INDT_KR,
} from "../rules/indentation";
import { WS_COMPACT } from "../rules/whitespaces";
import { groupStatements } from "../utils/group-statements";

export class MiscellaneousVisitors
  extends FemaScriptFormatterVisitor
  implements cst.BlockVisitor
{
  block(ctx: cst.BlockCstContext) {
    return [
      [
        [BRK_ALLMAN],
        "{",
        [WS_COMPACT],
        [I_INDT_KR, BRK_KR],
        [I_INDT_ALLMAN, BRK_ALLMAN],
      ],
      groupStatements(ctx.statement, this),
      [[D_INDT_KR, D_INDT_ALLMAN], [BRK_LN], "}"],
    ];
  }
}
