import * as cst from "@/types/cst";
import { imageFrom, imagesFrom } from "@/utils";
import { FemaScriptFormatterVisitor } from "../formatter";
import { BLOCK } from "../rules/block";
import { BRK_COMPACT, BRK_LN } from "../rules/breaklines";
import { D_INDT_COMPACT, I_INDT_COMPACT } from "../rules/indentation";
import { NONE, WS, WS_ALLMAN, WS_COMPACT, WS_KR } from "../rules/whitespaces";
import { groupStatements } from "../utils/group-statements";

export class MiscellaneousVisitors
  extends FemaScriptFormatterVisitor
  implements
    cst.BlockVisitor,
    cst.TypeDeclaratorVisitor,
    cst.EnumeratorDeclaratorVisitor,
    cst.EnumaratorEntryVisitor,
    cst.VariableAccessVisitor,
    cst.ArrayAccessSuffixVisitor,
    cst.ArrayAccessVisitor
{
  block(ctx: cst.BlockCstContext) {
    return BLOCK(ctx.LCurly, groupStatements(ctx.statement, this), ctx.RCurly);
  }

  typeDeclarator(ctx: cst.TypeDeclaratorCstContext) {
    return Object.values(ctx).map((node) => this.visit(node));
  }

  enumeratorDeclarator(ctx: cst.EnumeratorDeclaratorCstContext) {
    const { Enum, LCurly, enumaratorEntry, Comma, RCurly } = ctx;

    const commaImages = imagesFrom(Comma)!;
    const shouldBreak = enumaratorEntry.some(
      ({ children }) => !!children.AssignmentOperator
    );

    const enumEntries = enumaratorEntry.map((entry, i) => {
      const isLast = i === enumaratorEntry.length - 1;
      const behaviorAfterComma = shouldBreak ? BRK_LN : WS;
      const comma = isLast ? [] : [commaImages[i], behaviorAfterComma];

      return [this.visit(entry), comma];
    });

    const behaviorBeforeEnum = shouldBreak
      ? [
          [WS_KR, WS_ALLMAN],
          [I_INDT_COMPACT, BRK_COMPACT],
        ]
      : [WS];

    const behaviorAfterEnum = shouldBreak ? [WS_KR, [WS_COMPACT]] : [WS];

    const behaviorAfterContent = shouldBreak ? D_INDT_COMPACT : NONE;

    const content = shouldBreak
      ? BLOCK(LCurly, enumEntries, RCurly)
      : [[imageFrom(LCurly), WS], enumEntries, [WS, imageFrom(RCurly)]];

    return [
      [behaviorBeforeEnum, imageFrom(Enum), behaviorAfterEnum],
      content,
      behaviorAfterContent,
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
    const { LSquare, Identifier, NumberLiteral, RSquare } = ctx;

    return [
      imageFrom(LSquare),
      [imageFrom(Identifier), imageFrom(NumberLiteral)],
      imageFrom(RSquare),
    ];
  }
}
