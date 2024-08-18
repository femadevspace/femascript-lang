import * as cst from "@/types/cst";
import { imageFrom } from "@/utils";
import { FemaScriptFormatterVisitor } from "../formatter";
import { BRK_LN, SKIP_LN } from "../rules/breaklines";
import { D_INDT, I_INDT, INDT } from "../rules/indentation";
import { WS } from "../rules/whitespaces";
import { beforeEach, separateWith } from "../utils/rules";

export class AlgorithmStructureVisitors
  extends FemaScriptFormatterVisitor
  implements
    cst.AlgorithmVisitor,
    cst.HeaderVisitor,
    cst.TypesDeclaratorsVisitor
{
  algorithm(ctx: cst.AlgorithmCstContext) {
    return separateWith(SKIP_LN, [
      this.visit(ctx.header),
      this.visit(ctx.typesDeclarators),
      this.visit(ctx.constantsDeclarators),
      this.visit(ctx.variablesDeclarators),
      this.visit(ctx.program),
    ]);
  }

  header(ctx: cst.HeaderCstContext) {
    const { Algorithm, Identifier, SemiColon } = ctx;
    return [
      imageFrom(Algorithm),
      WS,
      imageFrom(Identifier),
      imageFrom(SemiColon),
    ];
  }

  typesDeclarators(ctx: cst.TypesDeclaratorsCstContext) {
    const { Type, enumDeclarator } = ctx;

    return [
      imageFrom(Type),
      [BRK_LN, I_INDT],
      separateWith(BRK_LN, beforeEach(this.visit(enumDeclarator), INDT)),
      [D_INDT],
    ];
  }
}
