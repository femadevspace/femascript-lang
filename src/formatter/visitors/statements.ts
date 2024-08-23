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
    const {
      assignmentStatement,
      controlStatements,
      operationsStatements,
      ...res
    } = ctx;

    if (Object.keys(res).length > 0)
      throw new Error("Unimplemented statement: " + JSON.stringify(res));

    return [
      this.visit(assignmentStatement),
      this.visit(controlStatements),
      this.visit(operationsStatements),
    ];
  }

  assignmentStatement(ctx: cst.AssignmentStatementCstContext) {
    return [this.visit(ctx.assignmentExpression), imageFrom(ctx.SemiColon)];
  }

  controlStatements(ctx: cst.ControlStatementsCstContext) {
    const { conditionalStatements, iterationStatements, ...res } = ctx;

    if (Object.keys(res).length > 0)
      throw new Error("Unimplemented statement: " + JSON.stringify(res));

    return [this.visit(conditionalStatements), this.visit(iterationStatements)];
  }

  operationsStatements(ctx: cst.OperationsStatementsCstContext) {
    const { printExpression, readExpression, ...res } = ctx;

    if (Object.keys(res).length > 0)
      throw new Error("Unimplemented statement: " + JSON.stringify(res));

    return [this.visit(printExpression), this.visit(readExpression)];
  }
}
