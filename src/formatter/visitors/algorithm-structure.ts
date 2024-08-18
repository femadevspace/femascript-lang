import { AlgorithmCstContext, AlgorithmVisitor } from "@/types/cst";
import { FemaScriptFormatterVisitor } from "../formatter";

export class AlgorithmStructureVisitors
  extends FemaScriptFormatterVisitor
  implements AlgorithmVisitor
{
  algorithm(ctx: AlgorithmCstContext) {
    return [
      this.visit(ctx.header),
      this.visit(ctx.typesDeclarators),
      this.visit(ctx.constantsDeclarators),
      this.visit(ctx.variablesDeclarators),
      this.visit(ctx.program),
    ];
  }
}
