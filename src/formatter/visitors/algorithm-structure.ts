import * as cst from "@/types/cst";
import { imageFrom } from "@/utils";
import { FemaScriptFormatterVisitor } from "../formatter";
import { SKIP_LN } from "../rules/breaklines";
import { WS } from "../rules/whitespaces";
import { separateWith } from "../utils/rules";

export class AlgorithmStructureVisitors
  extends FemaScriptFormatterVisitor
  implements cst.AlgorithmVisitor, cst.HeaderVisitor
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
}
