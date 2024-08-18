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
    return [this.visit(ctx.assignmentExpression), ";"];
  }

  controlStatements(ctx: cst.ControlStatementsCstContext) {
    const { conditionalStatements, iterationStatements, ...res } = ctx;

    if (Object.keys(res).length > 0)
      throw new Error("Unimplemented statement: " + JSON.stringify(res));

    return [this.visit(conditionalStatements), this.visit(iterationStatements)];
  }
}
