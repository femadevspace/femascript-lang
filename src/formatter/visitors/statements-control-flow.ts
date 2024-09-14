import * as cst from "@/types/cst";
import { imageFrom, imagesFrom } from "@/utils";
import { FemaScriptFormatterVisitor } from "../formatter";
import { BLOCK, CASE } from "../rules/block";
import {
  BRK_ALLMAN,
  BRK_COMPACT,
  BRK_KR,
  BRK_LN,
  F_BRK_COMPACT,
} from "../rules/breaklines";
import {
  D_INDT_ALLMAN,
  D_INDT_COMPACT,
  D_INDT_KR,
  I_INDT_ALLMAN,
  I_INDT_COMPACT,
  I_INDT_KR,
  POP_ALIGN_COMPACT,
  PUSH_ALIGN_COMPACT,
} from "../rules/indentation";
import { PARENS } from "../rules/parentheses";
import { NONE, WS, WS_COMPACT, WS_KR } from "../rules/whitespaces";
import { separateWith } from "../utils/rules";
import { WS_ALLMAN } from "./../rules/whitespaces";

export class IterationStatementsVisitors
  extends FemaScriptFormatterVisitor
  implements
    cst.IterationStatementsVisitor,
    cst.DoWhileStatementVisitor,
    cst.WhileDoStatementVisitor,
    cst.ForLoopStatementVisitor
{
  iterationStatements(ctx: cst.IterationStatementsCstContext) {
    return Object.values(ctx).map((node) => this.visit(node));
  }

  doWhileStatement(ctx: cst.DoWhileStatementCstContext) {
    const { Do, block, While, LParen, expression, RParen, SemiColon } = ctx;

    return [
      [imageFrom(Do), [WS_KR, WS_COMPACT]],
      this.visit(block),
      [[WS_KR, WS_COMPACT], [BRK_ALLMAN], imageFrom(While)],
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
      [I_INDT_COMPACT, F_BRK_COMPACT],
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
      [I_INDT_COMPACT, F_BRK_COMPACT],
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
    return Object.values(ctx).map((node) => this.visit(node));
  }

  ifStatement(ctx: cst.IfStatementCstContext) {
    const {
      If,
      LParen,
      expression,
      RParen,
      Then,
      block,
      assignmentStatement,
      elseStatement,
    } = ctx;

    const ELSE_ALIGN = elseStatement ? PUSH_ALIGN_COMPACT : NONE;
    const behaviorAfterThen = assignmentStatement
      ? [WS_COMPACT, [I_INDT_KR, BRK_KR], [I_INDT_ALLMAN, BRK_ALLMAN]]
      : [WS_KR, WS_COMPACT];

    const behaviorAfterContent = assignmentStatement
      ? [[D_INDT_KR, elseStatement ? BRK_KR : NONE], [D_INDT_ALLMAN]]
      : [elseStatement ? WS_KR : NONE];

    return [
      [imageFrom(If), WS],
      PARENS(LParen, this.visit(expression), RParen),
      [I_INDT_COMPACT, F_BRK_COMPACT],
      [ELSE_ALIGN, imageFrom(Then), behaviorAfterThen],
      [this.visit(assignmentStatement), this.visit(block)],
      [behaviorAfterContent],
      [this.visit(elseStatement)],
      [D_INDT_COMPACT],
    ];
  }

  elseStatement(ctx: cst.ElseStatementCstContext) {
    const { Else, block, assignmentStatement, ifStatement } = ctx;

    const hasAssignment = assignmentStatement ? WS_ALLMAN : NONE;
    const hasIfStatement = ifStatement ? WS_ALLMAN : POP_ALIGN_COMPACT;
    const behaviorAfterElse = [hasAssignment, hasIfStatement];
    const behaviorAfterContent = ifStatement ? POP_ALIGN_COMPACT : NONE;

    return [
      [BRK_ALLMAN, BRK_COMPACT],
      [imageFrom(Else), [WS_KR, WS_COMPACT, behaviorAfterElse]],
      [
        this.visit(assignmentStatement),
        this.visit(block),
        this.visit(ifStatement),
      ],
      [behaviorAfterContent],
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
        [WS_KR, I_INDT_COMPACT, F_BRK_COMPACT],
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

    return [
      imageFrom(Case),
      WS,
      caseValue,
      CASE(Do, Colon, block, statement, this),
    ];
  }

  defaultStatement(ctx: cst.DefaultStatementCstContext) {
    const { Default, Do, Colon, block, statement } = ctx;

    return [imageFrom(Default), CASE(Do, Colon, block, statement, this)];
  }
}
