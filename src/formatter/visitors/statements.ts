import * as cst from "@/types/cst";
import { imageFrom } from "@/utils";
import { FemaScriptFormatterVisitor } from "../formatter";

export class StatementsVisitors
  extends FemaScriptFormatterVisitor
  implements
    cst.StatementVisitor,
    cst.AssignmentStatementVisitor,
    cst.ControlStatementsVisitor,
    cst.OperationsStatementsVisitor
{
  statement(ctx: cst.StatementCstContext) {
    return Object.values(ctx).map((node) => this.visit(node));
  }

  assignmentStatement(ctx: cst.AssignmentStatementCstContext) {
    return [this.visit(ctx.assignmentExpression), imageFrom(ctx.SemiColon)];
  }

  controlStatements(ctx: cst.ControlStatementsCstContext) {
    return Object.values(ctx).map((node) => this.visit(node));
  }

  operationsStatements(ctx: cst.OperationsStatementsCstContext) {
    return Object.values(ctx).map((node) => this.visit(node));
  }
}
