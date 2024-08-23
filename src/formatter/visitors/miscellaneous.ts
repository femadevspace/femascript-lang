import * as cst from "@/types/cst";
import { imageFrom } from "@/utils";
import { FemaScriptFormatterVisitor } from "../formatter";
import { BLOCK } from "../rules/block";
import { WS } from "../rules/whitespaces";
import { groupStatements } from "../utils/group-statements";
import { separateWith } from "../utils/rules";

export class MiscellaneousVisitors
  extends FemaScriptFormatterVisitor
  implements
    cst.BlockVisitor,
    cst.EnumeratorDeclaratorVisitor,
    cst.EnumaratorEntryVisitor,
    cst.VariableAccessVisitor,
    cst.ArrayAccessSuffixVisitor,
    cst.ArrayAccessVisitor
{
  block(ctx: cst.BlockCstContext) {
    return BLOCK(ctx.LCurly, groupStatements(ctx.statement, this), ctx.RCurly);
  }

  enumeratorDeclarator(ctx: cst.EnumeratorDeclaratorCstContext) {
    const { Identifier, Enum, enumaratorEntry } = ctx;

    return [
      imageFrom(Identifier),
      ":",
      WS,
      imageFrom(Enum),
      [
        WS,
        "{",
        WS,
        separateWith([",", WS], this.visit(enumaratorEntry)),
        WS,
        "}",
        ";",
      ],
    ];
  }

  enumaratorEntry(ctx: cst.EnumaratorEntryCstContext) {
    const { Identifier, AssignmentOperator, NumberLiteral, StringLiteral } =
      ctx;

    const assingment = AssignmentOperator
      ? [
          WS,
          imageFrom(AssignmentOperator),
          WS,
          [imageFrom(NumberLiteral), imageFrom(StringLiteral)],
        ]
      : [];

    return [imageFrom(Identifier), assingment];
  }

  variableAccess(ctx: cst.VariableAccessCstContext) {
    const { Identifier, arrayAccessSuffix } = ctx;

    return [imageFrom(Identifier), this.visit(arrayAccessSuffix)];
  }

  arrayAccessSuffix(ctx: cst.ArrayAccessSuffixCstContext) {
    return [this.visit(ctx.arrayAccess)];
  }

  arrayAccess(ctx: cst.ArrayAccessCstContext) {
    const { Identifier, NumberLiteral } = ctx;

    return ["[", [imageFrom(Identifier), imageFrom(NumberLiteral)], "]"];
  }
}
