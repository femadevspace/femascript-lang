import { AlgorithmCstContext, AlgorithmVisitor } from "@/types/cst";
import { FemaScriptFormatterVisitor } from "../formatter";
import { SKIP_LN } from "../rules/breaklines";
import { separateWith } from "../utils/rules";

export class AlgorithmStructureVisitors
  extends FemaScriptFormatterVisitor
  implements AlgorithmVisitor
{
  algorithm(ctx: AlgorithmCstContext) {
    return separateWith(SKIP_LN, [
      this.visit(ctx.header),
      this.visit(ctx.typesDeclarators),
      this.visit(ctx.constantsDeclarators),
      this.visit(ctx.variablesDeclarators),
      this.visit(ctx.program),
    ]);
  }
}
