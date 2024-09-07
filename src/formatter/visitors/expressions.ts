import * as cst from "@/types/cst";
import { imageFrom } from "@/utils";
import { FemaScriptFormatterVisitor } from "../formatter";
import { PARENS } from "../rules/parentheses";
import { WS } from "../rules/whitespaces";
import { binaryExpression } from "../utils/expressions";
import { separateWith } from "../utils/rules";

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
    const { additionExpression, expression, Question, Colon } = ctx;

    const ternary = expression
      ? [
          WS,
          imageFrom(Question),
          WS,
          this.visit(expression[0]),
          WS,
          imageFrom(Colon),
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
    return PARENS(ctx.LParen, this.visit(ctx.expression), ctx.RParen, false);
  }
}

export class OperationsExpressionVisitors
  extends FemaScriptFormatterVisitor
  implements cst.PrintExpressionVisitor, cst.ReadExpressionVisitor
{
  printExpression(ctx: cst.PrintExpressionCstContext) {
    return [
      imageFrom(ctx.Print),
      WS,
      separateWith([",", WS], this.visit(ctx.expression)),
      imageFrom(ctx.SemiColon),
    ];
  }

  readExpression(ctx: cst.ReadExpressionCstContext) {
    return [
      imageFrom(ctx.Read),
      WS,
      separateWith([",", WS], this.visit(ctx.variableAccess)),
      imageFrom(ctx.SemiColon),
    ];
  }
}
