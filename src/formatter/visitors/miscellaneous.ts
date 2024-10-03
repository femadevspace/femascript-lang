import * as cst from "@/types/cst";
import { imageFrom, imagesFrom } from "@/utils";
import { FemaScriptFormatterVisitor } from "../formatter";
import { BLOCK } from "../rules/block";
import { BRK_COMPACT, BRK_LN } from "../rules/breaklines";
import { D_INDT_COMPACT, I_INDT_COMPACT } from "../rules/indentation";
import { NONE, WS, WS_ALLMAN, WS_COMPACT, WS_KR } from "../rules/whitespaces";
import { groupStatements } from "../utils/group-statements";
import { separateWith } from "../utils/rules";

export class MiscellaneousVisitors
  extends FemaScriptFormatterVisitor
  implements
    cst.TypeVisitor,
    cst.BlockVisitor,
    cst.TypeDeclaratorVisitor,
    cst.EnumeratorDeclaratorVisitor,
    cst.EnumaratorEntryVisitor,
    cst.StructDeclaratorVisitor,
    cst.StructPropertyVisitor,
    cst.QualifiedIdentifierVisitor,
    cst.VariableAccessVisitor,
    cst.ArrayAccessSuffixVisitor,
    cst.ArrayAccessVisitor
{
  type(ctx: cst.TypeCstContext) {
    const { PrimitiveTypes, ArrayType, arrayAccessSuffix, Of } = ctx;
    const primiteTypeImage = imageFrom(PrimitiveTypes);

    if (!ArrayType) return [primiteTypeImage];

    return separateWith(WS, [
      [imageFrom(ArrayType), this.visit(arrayAccessSuffix)],
      imageFrom(Of),
      primiteTypeImage,
    ]);
  }

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

  structDeclarator(ctx: cst.StructDeclaratorCstContext) {
    const { Struct, LCurly, structProperty, RCurly } = ctx;

    return [
      [
        [WS_KR, WS_ALLMAN],
        [I_INDT_COMPACT, BRK_COMPACT],
        imageFrom(Struct),
        [WS_KR, WS_COMPACT],
      ],
      BLOCK(LCurly, separateWith([BRK_LN], this.visit(structProperty)), RCurly),
      [D_INDT_COMPACT],
    ];
  }

  structProperty(ctx: cst.StructPropertyCstContext) {
    const { Identifier, Colon, type, SemiColon } = ctx;

    return [
      imageFrom(Identifier),
      imageFrom(Colon),
      WS,
      this.visit(type),
      imageFrom(SemiColon),
    ];
  }

  qualifiedIdentifier(ctx: cst.QualifiedIdentifierCstContext) {
    const { Identifier, Dot } = ctx;
    const dotImages = imagesFrom(Dot)!;

    return Identifier.map((id, i) => {
      const isLast = i === Identifier.length - 1;
      const dot = isLast ? [] : dotImages[i];
      return [imageFrom([id]), dot];
    });
  }

  variableAccess(ctx: cst.VariableAccessCstContext) {
    const { qualifiedIdentifier, arrayAccessSuffix } = ctx;

    return [this.visit(qualifiedIdentifier), this.visit(arrayAccessSuffix)];
  }

  arrayAccessSuffix(ctx: cst.ArrayAccessSuffixCstContext) {
    return [this.visit(ctx.arrayAccess)];
  }

  arrayAccess(ctx: cst.ArrayAccessCstContext) {
    const { LSquare, expression, RSquare, Dot, variableAccess } = ctx;

    return [
      imageFrom(LSquare),
      this.visit(expression),
      imageFrom(RSquare),
      [imageFrom(Dot), this.visit(variableAccess)],
    ];
  }
}
