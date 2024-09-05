import * as cst from "@/types/cst";
import { imageFrom, imagesFrom } from "@/utils";
import { FemaScriptFormatterVisitor } from "../formatter";
import { BLOCK } from "../rules/block";
import { BRK_ALLMAN, BRK_COMPACT, BRK_KR, BRK_LN } from "../rules/breaklines";
import {
  D_INDT,
  D_INDT_COMPACT,
  I_INDT,
  I_INDT_COMPACT,
} from "../rules/indentation";
import { PARENS } from "../rules/parentheses";
import { WS, WS_ALLMAN, WS_COMPACT, WS_KR } from "../rules/whitespaces";
import { separateWith } from "../utils/rules";

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
    const { Do, block, While, LParen, expression, RParen, SemiColon } = ctx;

    return [
      [imageFrom(Do), [WS_KR, WS_COMPACT]],
      this.visit(block),
      [[WS_KR], [BRK_ALLMAN, BRK_COMPACT], imageFrom(While)],
      [
        WS,
        PARENS(LParen, this.visit(expression), RParen, false),
        imageFrom(SemiColon),
      ],
    ];
  }

  whileDoStatement(ctx: cst.WhileDoStatementCstContext) {
    const { While, LParen, expression, RParen, Do, block } = ctx;

    return [
      [imageFrom(While), WS],
      PARENS(LParen, this.visit(expression), RParen),
      [I_INDT_COMPACT, BRK_COMPACT],
      [imageFrom(Do), [WS_KR, WS_COMPACT]],
      this.visit(block),
      [D_INDT_COMPACT],
    ];
  }

  forLoopStatement(ctx: cst.ForLoopStatementCstContext) {
    const {
      For,
      LParen,
      assignmentExpression,
      SemiColon,
      expression,
      RParen,
      Do,
      block,
    } = ctx;

    const semiColonsImages = imagesFrom(SemiColon);

    return [
      [imageFrom(For), WS],
      PARENS(
        LParen,
        [
          this.visit(assignmentExpression[0]),
          [semiColonsImages[0], WS],
          this.visit(expression),
          [semiColonsImages[1], WS],
          this.visit(assignmentExpression[1]),
        ],
        RParen
      ),
      [I_INDT_COMPACT, BRK_COMPACT],
      [imageFrom(Do), [WS_KR, WS_COMPACT]],
      this.visit(block),
      [D_INDT_COMPACT],
    ];
  }
}

export class ConditionalStatementsVisitors
  extends FemaScriptFormatterVisitor
  implements
    cst.ConditionalStatementsVisitor,
    cst.IfStatementVisitor,
    cst.ElseStatementVisitor,
    cst.SwitchStatementVisitor,
    cst.CaseStatementVisitor,
    cst.DefaultStatementVisitor
{
  conditionalStatements(ctx: cst.ConditionalStatementsCstContext) {
    const { ifStatement, switchStatement, ...res } = ctx;

    if (Object.keys(res).length > 0)
      throw new Error("Unimplemented statement: " + JSON.stringify(res));

    return [this.visit(ifStatement), this.visit(switchStatement)];
  }

  ifStatement(ctx: cst.IfStatementCstContext) {
    const { If, LParen, expression, RParen, Then, block, elseStatement } = ctx;

    return [
      [imageFrom(If), WS],
      PARENS(LParen, this.visit(expression), RParen),
      [I_INDT_COMPACT, BRK_COMPACT],
      [imageFrom(Then), [WS_KR, WS_COMPACT]],
      this.visit(block),
      this.visit(elseStatement),
      [D_INDT_COMPACT],
    ];
  }

  elseStatement(ctx: cst.ElseStatementCstContext) {
    const { Else, block, ifStatement } = ctx;

    return [
      [WS_KR, [BRK_ALLMAN, BRK_COMPACT]],
      [imageFrom(Else), WS],
      [this.visit(block), this.visit(ifStatement)],
    ];
  }

  switchStatement(ctx: cst.SwitchStatementCstContext) {
    const {
      Switch,
      LParen,
      variableAccess,
      RParen,
      caseStatement,
      defaultStatement,
      LCurly,
      RCurly,
    } = ctx;

    const variable = this.visit(variableAccess);
    const parenthesizedVariable = !!LParen
      ? PARENS(LParen, variable, RParen!, false)
      : variable;

    return [
      [
        imageFrom(Switch),
        WS,
        parenthesizedVariable,
        [WS_KR, I_INDT_COMPACT, BRK_COMPACT],
      ],
      BLOCK(
        LCurly,
        separateWith(BRK_LN, [
          separateWith(BRK_LN, this.visit(caseStatement)),
          this.visit(defaultStatement),
        ]),
        RCurly
      ),
      [D_INDT_COMPACT],
    ];
  }

  caseStatement(ctx: cst.CaseStatementCstContext) {
    const { Case, StringLiteral, variableAccess, Colon, Do, block, statement } =
      ctx;

    const caseValue = !!StringLiteral
      ? imageFrom(StringLiteral)
      : this.visit(variableAccess);

    const isAssignmentStatement =
      !!statement?.at(0)?.children.assignmentStatement;

    const shouldBreakLine = !isAssignmentStatement
      ? [[I_INDT, BRK_KR, BRK_ALLMAN], [D_INDT]]
      : [[], []];

    const content = !!statement
      ? [
          imageFrom(Colon),
          WS,
          shouldBreakLine[0],
          this.visit(statement),
          shouldBreakLine[1],
        ]
      : [WS_KR, WS_COMPACT, this.visit(block)];

    return [
      imageFrom(Case),
      WS,
      caseValue,
      [
        [WS_KR, WS_ALLMAN],
        [I_INDT_COMPACT, BRK_COMPACT],
        imageFrom(Do),
        content,
        [D_INDT_COMPACT],
      ],
    ];
  }

  defaultStatement(ctx: cst.DefaultStatementCstContext) {
    const { Default, Do, Colon, block, statement } = ctx;

    const isAssignmentStatement =
      !!statement?.at(0)?.children.assignmentStatement;

    const shouldBreakLine = !isAssignmentStatement ? ["🚨", BRK_LN] : [];

    const content = !!statement
      ? [imageFrom(Colon), WS, shouldBreakLine, this.visit(statement)]
      : [WS_KR, WS_COMPACT, this.visit(block)];

    return [
      imageFrom(Default),
      [
        [WS_KR, WS_ALLMAN],
        [I_INDT_COMPACT, BRK_COMPACT],
        imageFrom(Do),
        content,
        [D_INDT_COMPACT],
      ],
    ];
  }
}
