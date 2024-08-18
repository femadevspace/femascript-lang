import * as cst from "@/types/cst";
import { FemaScriptFormatterVisitor } from "../formatter";

export class ExpressionsVisitors
  extends FemaScriptFormatterVisitor
  implements cst.ExpressionVisitor
{
  expression(ctx: cst.ExpressionCstContext) {
    const { ternaryExpression, ...res } = ctx;

    if (Object.keys(res).length > 0)
      throw new Error("Unimplemented statement: " + JSON.stringify(res));

    return [this.visit(ternaryExpression)];
  }
}
