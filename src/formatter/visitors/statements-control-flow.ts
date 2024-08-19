import * as cst from "@/types/cst";
import { imageFrom } from "@/utils";
import { FemaScriptFormatterVisitor } from "../formatter";
import { BRK_ALLMAN, BRK_COMPACT } from "../rules/breaklines";
import { D_INDT_COMPACT, I_INDT_COMPACT } from "../rules/indentation";
import { WS, WS_ALLMAN, WS_COMPACT, WS_KR } from "../rules/whitespaces";

export class IterationStatementsVisitors
  extends FemaScriptFormatterVisitor
  implements
    cst.IterationStatementsVisitor,
    cst.DoWhileStatementVisitor,
    cst.WhileDoStatementVisitor,
    cst.ForLoopStatementVisitor
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

  doWhileStatement(ctx: cst.DoWhileStatementCstContext) {
    const { Do, block, While, expression } = ctx;

    return [
      [imageFrom(Do), [WS_KR, WS_COMPACT]],
      this.visit(block),
      [[WS_KR], [BRK_ALLMAN, BRK_COMPACT], imageFrom(While)],
      [WS, ["(", this.visit(expression), ")", ";"]],
    ];
  }

  whileDoStatement(ctx: cst.WhileDoStatementCstContext) {
    const { While, expression, Do, block } = ctx;

    return [
      [imageFrom(While), WS],
      ["(", this.visit(expression), ")", [WS_KR, WS_ALLMAN]],
      [I_INDT_COMPACT, BRK_COMPACT],
      [imageFrom(Do), [WS_KR, WS_COMPACT]],
      this.visit(block),
      [D_INDT_COMPACT],
    ];
  }

  forLoopStatement(ctx: cst.ForLoopStatementCstContext) {
    const { For, assignmentExpression, expression, Do, block } = ctx;

    return [
      [imageFrom(For), WS],
      [
        "(",
        this.visit(assignmentExpression[0]),
        [";", WS],
        this.visit(expression),
        [";", WS],
        this.visit(assignmentExpression[1]),
        ")",
      ],
      [I_INDT_COMPACT, BRK_COMPACT],
      [imageFrom(Do), [WS_KR, WS_COMPACT]],
      this.visit(block),
      [D_INDT_COMPACT],
    ];
  }
}
