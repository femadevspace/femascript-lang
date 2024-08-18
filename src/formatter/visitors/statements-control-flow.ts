import * as cst from "@/types/cst";
import { FemaScriptFormatterVisitor } from "../formatter";

export class IterationStatementsVisitors
  extends FemaScriptFormatterVisitor
  implements cst.IterationStatementsVisitor
{
  iterationStatements(ctx: cst.IterationStatementsCstContext) {
    const { doWhileStatement, forLoopStatement, whileDoStatement, ...res } =
      ctx;

    if (Object.keys(res).length > 0)
      throw new Error("Unimplemented statement: " + JSON.stringify(res));

    return [
      this.visit(doWhileStatement),
      this.visit(whileDoStatement),
      this.visit(forLoopStatement),
    ];
  }
}
