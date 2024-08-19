import * as cst from "@/types/cst";
import { imageFrom } from "@/utils";
import { FemaScriptFormatterVisitor } from "../formatter";
import { WS } from "../rules/whitespaces";

export class ExpressionsVisitors
  extends FemaScriptFormatterVisitor
  implements cst.AssignmentExpressionVisitor, cst.ExpressionVisitor
{
  assignmentExpression(ctx: cst.AssignmentExpressionCstContext) {
    const {
      variableAccess,
      UnarySuffixOperator,
      AssignmentOperator,
      expression,
    } = ctx;

    const assignment = UnarySuffixOperator
      ? imageFrom(UnarySuffixOperator)
      : [WS, imageFrom(AssignmentOperator), WS, this.visit(expression)];

    return [this.visit(variableAccess), assignment];
  }

  expression(ctx: cst.ExpressionCstContext) {
    const { ternaryExpression, ...res } = ctx;

    if (Object.keys(res).length > 0)
      throw new Error("Unimplemented statement: " + JSON.stringify(res));

    return [this.visit(ternaryExpression)];
  }
}
