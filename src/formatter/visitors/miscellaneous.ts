import * as cst from "@/types/cst";
import { imageFrom } from "@/utils";
import { FemaScriptFormatterVisitor } from "../formatter";
import { BLOCK } from "../rules/block";
import { groupStatements } from "../utils/group-statements";

export class MiscellaneousVisitors
  extends FemaScriptFormatterVisitor
  implements cst.BlockVisitor, cst.VariableAccessVisitor
{
  block(ctx: cst.BlockCstContext) {
    return BLOCK(groupStatements(ctx.statement, this));
  }

  variableAccess(ctx: cst.VariableAccessCstContext) {
    const { Identifier, arrayAccessSuffix } = ctx;

    return [imageFrom(Identifier), this.visit(arrayAccessSuffix)];
  }
}
