import * as cst from "@/types/cst";
import { imageFrom } from "@/utils";
import { FemaScriptFormatterVisitor } from "../formatter";
import { WS } from "../rules/whitespaces";
import { binaryExpression } from "../utils/expressions";

export class ExpressionsVisitors
  extends FemaScriptFormatterVisitor
  implements
    cst.AssignmentExpressionVisitor,
    cst.ExpressionVisitor,
    cst.TernaryExpressionVisitor,
    cst.AdditionExpressionVisitor,
    cst.MultiplicationExpressionVisitor,
    cst.LogicalExpressionVisitor,
    cst.RelationalExpressionVisitor,
    cst.UnaryExpressionVisitor,
    cst.ParenthesisExpressionVisitor
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

  ternaryExpression(ctx: cst.TernaryExpressionCstContext) {
    const { additionExpression, expression } = ctx;

    const ternary = expression
      ? [
          WS,
          "?",
          WS,
          this.visit(expression[0]),
          WS,
          ":",
          WS,
          this.visit(expression[1]),
        ]
      : [];

    return [this.visit(additionExpression), ternary];
  }

  additionExpression(ctx: cst.AdditionExpressionCstContext) {
    return binaryExpression(
      ctx.multiplicationExpression,
      ctx.AdditiveOperator,
      this
    );
  }

  multiplicationExpression(ctx: cst.MultiplicationExpressionCstContext) {
    return binaryExpression(
      ctx.logicalExpression,
      ctx.MultiplicativeOperator,
      this
    );
  }

  logicalExpression(ctx: cst.LogicalExpressionCstContext) {
    return binaryExpression(
      ctx.relationalExpression,
      ctx.LogicalOperator,
      this
    );
  }

  relationalExpression(ctx: cst.RelationalExpressionCstContext) {
    return binaryExpression(ctx.unaryExpression, ctx.RelationalOperator, this);
  }

  unaryExpression(ctx: cst.UnaryExpressionCstContext) {
    const {
      UnaryPrefixOperator,
      Literal,
      variableAccess,
      parenthesisExpression,
    } = ctx;

    return [
      imageFrom(UnaryPrefixOperator),
      [
        imageFrom(Literal),
        this.visit(variableAccess),
        this.visit(parenthesisExpression),
      ],
    ];
  }

  parenthesisExpression(ctx: cst.ParenthesisExpressionCstContext) {
    return ["(", WS, this.visit(ctx.expression), WS, ")"];
  }
}
