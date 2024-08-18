import * as cst from "@/types/cst";
import { imageFrom, imagesFrom } from "@/utils";
import { FemaScriptFormatterVisitor, VisitedNode } from "../formatter";
import { BRK_LN, SKIP_LN } from "../rules/breaklines";
import { D_INDT, I_INDT, INDT } from "../rules/indentation";
import { WS } from "../rules/whitespaces";
import { beforeEach, separateWith } from "../utils/rules";

export class AlgorithmStructureVisitors
  extends FemaScriptFormatterVisitor
  implements
    cst.AlgorithmVisitor,
    cst.HeaderVisitor,
    cst.TypesDeclaratorsVisitor,
    cst.ConstantsDeclaratorsVisitor,
    cst.VariablesDeclaratorsVisitor,
    cst.VariableDeclaratorVisitor,
    cst.ProgramVisitor
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

  constantsDeclarators(ctx: cst.ConstantsDeclaratorsCstContext) {
    const { Constant, Identifier, AssignmentOperator, expression, SemiColon } =
      ctx;

    const constKeyword = imageFrom(Constant);
    if (!Identifier) return [constKeyword];

    const declarators = imagesFrom(Identifier)!.map((constName, i) => [
      constName,
      WS,
      imageFrom(AssignmentOperator)!,
      WS,
      this.visit(expression![i]),
      imageFrom(SemiColon)!,
    ]);

    return [
      constKeyword,
      [BRK_LN, I_INDT],
      separateWith(BRK_LN, beforeEach(declarators, INDT)),
      [D_INDT],
    ];
  }

  variablesDeclarators(ctx: cst.VariablesDeclaratorsCstContext) {
    const { Variable, variableDeclarator, SemiColon } = ctx;

    const varKeyword = imageFrom(Variable);

    if (!variableDeclarator) return [varKeyword];

    const declarators = variableDeclarator.map((declarator) => [
      this.visit(declarator),
      imageFrom(SemiColon)!,
    ]);

    return [
      varKeyword,
      [BRK_LN, I_INDT],
      separateWith(BRK_LN, beforeEach(declarators, INDT)),
      [D_INDT],
    ];
  }

  variableDeclarator(ctx: cst.VariableDeclaratorCstContext) {
    const { Identifier, ArrayType, arrayAccessSuffix, Of, PrimitiveTypes } =
      ctx;

    const names = separateWith([",", WS], [...imagesFrom(Identifier)!]);
    let type: VisitedNode = [imageFrom(PrimitiveTypes)!];

    if (ArrayType)
      type = separateWith(WS, [
        [imageFrom(ArrayType)!, this.visit(arrayAccessSuffix)],
        imageFrom(Of)!,
        type,
      ]);

    return [names, [":", WS], type];
  }

  program(ctx: cst.ProgramCstContext) {
    const { Start, statement, End } = ctx;

    return [
      imageFrom(Start)!,
      [BRK_LN, I_INDT],
      separateWith(BRK_LN, beforeEach(this.visit(statement), INDT)),
      [BRK_LN, D_INDT],
      imageFrom(End)!,
    ];
  }
}
