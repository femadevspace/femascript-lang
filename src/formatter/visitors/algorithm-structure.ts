import * as cst from "@/types/cst";
import { imageFrom, imagesFrom } from "@/utils";
import { FemaScriptFormatterVisitor, VisitedNode } from "../formatter";
import { BRK_LN, SKIP_LN } from "../rules/breaklines";
import { D_INDT, I_INDT } from "../rules/indentation";
import { WS } from "../rules/whitespaces";
import { groupStatements } from "../utils/group-statements";
import { separateWith } from "../utils/rules";

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
    const { Type, Identifier, Colon, typeDeclarator, SemiColon } = ctx;

    const typeKeyword = imageFrom(Type);
    if (!Identifier) return [typeKeyword];

    const colonsImages = imagesFrom(Colon)!;
    const semiColonsImages = imagesFrom(SemiColon)!;

    const declarators = imagesFrom(Identifier)!.map((typeName, i) => [
      typeName,
      colonsImages[i],
      this.visit(typeDeclarator![i]),
      semiColonsImages[i],
    ]);

    return [
      imageFrom(Type),
      [I_INDT, BRK_LN],
      separateWith(BRK_LN, declarators),
      [D_INDT],
    ];
  }

  constantsDeclarators(ctx: cst.ConstantsDeclaratorsCstContext) {
    const { Constant, Identifier, AssignmentOperator, expression, SemiColon } =
      ctx;

    const constKeyword = imageFrom(Constant);
    if (!Identifier) return [constKeyword];

    const assignmentImages = imagesFrom(AssignmentOperator)!;
    const semiColonsImages = imagesFrom(SemiColon)!;

    const declarators = imagesFrom(Identifier)!.map((constName, i) => [
      constName,
      WS,
      assignmentImages[i],
      WS,
      this.visit(expression![i]),
      semiColonsImages[i],
    ]);

    return [
      constKeyword,
      [I_INDT, BRK_LN],
      separateWith(BRK_LN, declarators),
      [D_INDT],
    ];
  }

  variablesDeclarators(ctx: cst.VariablesDeclaratorsCstContext) {
    const { Variable, variableDeclarator, SemiColon } = ctx;

    const varKeyword = imageFrom(Variable);
    if (!variableDeclarator) return [varKeyword];

    const semiColonsImages = imagesFrom(SemiColon)!;

    const declarators = variableDeclarator.map((declarator, i) => [
      this.visit(declarator),
      semiColonsImages[i],
    ]);

    return [
      varKeyword,
      [I_INDT, BRK_LN],
      separateWith(BRK_LN, declarators),
      [D_INDT],
    ];
  }

  variableDeclarator(ctx: cst.VariableDeclaratorCstContext) {
    const {
      Identifier,
      ArrayType,
      arrayAccessSuffix,
      Of,
      PrimitiveTypes,
      Colon,
    } = ctx;

    const names = separateWith([",", WS], [...imagesFrom(Identifier)!]);
    let type: VisitedNode = [imageFrom(PrimitiveTypes)!];

    if (ArrayType)
      type = separateWith(WS, [
        [imageFrom(ArrayType)!, this.visit(arrayAccessSuffix)],
        imageFrom(Of)!,
        type,
      ]);

    return [names, [imageFrom(Colon), WS], type];
  }

  program(ctx: cst.ProgramCstContext) {
    const { Start, statement, End } = ctx;

    return [
      imageFrom(Start)!,
      [I_INDT, BRK_LN],
      groupStatements(statement, this),
      [D_INDT, BRK_LN],
      imageFrom(End)!,
    ];
  }
}
