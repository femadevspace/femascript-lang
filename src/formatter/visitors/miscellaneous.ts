import * as cst from "@/types/cst";
import { FemaScriptFormatterVisitor } from "../formatter";
import { BLOCK } from "../rules/block";
import { groupStatements } from "../utils/group-statements";

export class MiscellaneousVisitors
  extends FemaScriptFormatterVisitor
  implements cst.BlockVisitor
{
  block(ctx: cst.BlockCstContext) {
    return BLOCK(groupStatements(ctx.statement, this));
  }
}
