import * as cst from "@/types/cst";
import { FemaScriptFormatterVisitor } from "../formatter";

export class StatementsVisitors
  extends FemaScriptFormatterVisitor
  implements
    cst.StatementVisitor,
    cst.AssignmentStatementVisitor,
    cst.ControlStatementsVisitor
{
  statement(ctx: cst.StatementCstContext) {
    return [
      this.visit(ctx.assignmentStatement),
      this.visit(ctx.controlStatements),
      this.visit(ctx.operationsStatements),
    ];
  }

  assignmentStatement(ctx: cst.AssignmentStatementCstContext) {
    return [this.visit(ctx.assignmentExpression), ";"];
  }

  controlStatements(ctx: cst.ControlStatementsCstContext) {
    return [
      this.visit(ctx.conditionalStatements),
      this.visit(ctx.iterationStatements),
    ];
  }
}