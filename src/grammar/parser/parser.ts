import { getTokens } from "@/grammar/lexer";
import * as lexer from "@/grammar/lexer/tokens";
import type { EnclosiveNodes } from "@/utils/comments";
import { type CstNode, CstParser } from "chevrotain";
import { errorMessageProvider } from "./errors-provider";

export type Production = Exclude<
  keyof FemaScriptLanguageParser,
  | keyof CstParser
  | "mostEnclosiveCstNodeByStartOffset"
  | "mostEnclosiveCstNodeByEndOffset"
  | "cstPostNonTerminal"
>;

export class FemaScriptLanguageParser extends CstParser {
  // ======================= ALGORITHM STRUCTURE RULES =======================
  algorithm = this.RULE("algorithm", () => {
    this.SUBRULE(this.header);

    this.OPTION(() => {
      this.SUBRULE(this.typesDeclarators);
    });

    this.OPTION2(() => {
      this.SUBRULE(this.constantsDeclarators);
    });

    this.OPTION3(() => {
      this.SUBRULE(this.variablesDeclarators);
    });

    this.SUBRULE(this.program);
  });

  header = this.RULE("header", () => {
    this.CONSUME(lexer.AlgorithmKeyword);
    this.CONSUME(lexer.Identifier);

    this.OPTION(() => this.CONSUME(lexer.SemiColon));
  });

  typesDeclarators = this.RULE("typesDeclarators", () => {
    this.CONSUME(lexer.TypeKeyword);

    this.MANY(() => {
      this.CONSUME(lexer.Identifier);
      this.CONSUME(lexer.Colon);
      this.SUBRULE(this.typeDeclarator);
      this.CONSUME(lexer.SemiColon);
    });
  });

  constantsDeclarators = this.RULE("constantsDeclarators", () => {
    this.CONSUME(lexer.ConstantKeyword);

    this.MANY(() => {
      this.CONSUME(lexer.Identifier);
      this.CONSUME(lexer.AssignmentOperator);
      this.SUBRULE(this.expression);
      this.CONSUME(lexer.SemiColon);
    });
  });

  variablesDeclarators = this.RULE("variablesDeclarators", () => {
    this.CONSUME(lexer.VariableKeyword);

    this.MANY(() => {
      this.SUBRULE(this.variableDeclarator);
      this.CONSUME(lexer.SemiColon);
    });
  });

  program = this.RULE("program", () => {
    this.CONSUME(lexer.StartKeyword);

    this.AT_LEAST_ONE(() => this.SUBRULE(this.statement));

    this.CONSUME(lexer.EndKeyword);
  });

  // ======================= STATEMENTS RULES =======================
  statement = this.RULE("statement", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.assignmentStatement) },
      { ALT: () => this.SUBRULE(this.controlStatements) },
      { ALT: () => this.SUBRULE(this.operationsStatements) },
    ]);
  });

  assignmentStatement = this.RULE("assignmentStatement", () => {
    this.SUBRULE(this.assignmentExpression);
    this.CONSUME(lexer.SemiColon);
  });

  controlStatements = this.RULE("controlStatements", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.iterationStatements) },
      { ALT: () => this.SUBRULE(this.conditionalStatements) },
    ]);
  });

  operationsStatements = this.RULE("operationsStatements", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.printExpression) },
      { ALT: () => this.SUBRULE(this.readExpression) },
    ]);
  });

  // === CONTROL FLOW RULES SUBSET ===
  iterationStatements = this.RULE("iterationStatements", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.doWhileStatement) },
      { ALT: () => this.SUBRULE(this.whileDoStatement) },
      { ALT: () => this.SUBRULE(this.forLoopStatement) },
    ]);
  });

  doWhileStatement = this.RULE("doWhileStatement", () => {
    this.CONSUME(lexer.DoKeyword);
    this.SUBRULE(this.block);
    this.CONSUME(lexer.WhileKeyword);
    this.CONSUME(lexer.LParen);
    this.SUBRULE(this.expression);
    this.CONSUME(lexer.RParen);
    this.CONSUME(lexer.SemiColon);
  });

  whileDoStatement = this.RULE("whileDoStatement", () => {
    this.CONSUME(lexer.WhileKeyword);
    this.CONSUME(lexer.LParen);
    this.SUBRULE(this.expression);
    this.CONSUME(lexer.RParen);
    this.CONSUME(lexer.DoKeyword);
    this.SUBRULE(this.block);
  });

  forLoopStatement = this.RULE("forLoopStatement", () => {
    this.CONSUME(lexer.ForKeyword);
    this.CONSUME(lexer.LParen);
    this.SUBRULE(this.assignmentExpression);
    this.CONSUME(lexer.SemiColon);
    this.SUBRULE(this.expression);
    this.CONSUME2(lexer.SemiColon);
    this.SUBRULE2(this.assignmentExpression);
    this.CONSUME(lexer.RParen);
    this.CONSUME(lexer.DoKeyword);
    this.SUBRULE(this.block);
  });

  conditionalStatements = this.RULE("conditionalStatements", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.ifStatement) },
      { ALT: () => this.SUBRULE(this.switchStatement) },
    ]);
  });

  ifStatement = this.RULE("ifStatement", () => {
    this.CONSUME(lexer.IfKeyword);
    this.CONSUME(lexer.LParen);
    this.SUBRULE(this.expression);
    this.CONSUME(lexer.RParen);
    this.CONSUME(lexer.ThenKeyword);

    this.OR([
      { ALT: () => this.SUBRULE(this.block) },
      { ALT: () => this.SUBRULE(this.assignmentStatement) },
    ]);

    this.OPTION(() => this.SUBRULE(this.elseStatement));
  });

  elseStatement = this.RULE("elseStatement", () => {
    this.CONSUME(lexer.ElseKeyword);

    this.OR([
      {
        ALT: () =>
          this.OR2([
            { ALT: () => this.SUBRULE(this.block) },
            { ALT: () => this.SUBRULE(this.assignmentStatement) },
          ]),
      },
      { ALT: () => this.SUBRULE(this.ifStatement) },
    ]);
  });

  switchStatement = this.RULE("switchStatement", () => {
    this.CONSUME(lexer.SwitchKeyword);

    this.OR([
      { ALT: () => this.SUBRULE(this.variableAccess) },
      {
        ALT: () => {
          this.CONSUME(lexer.LParen);
          this.SUBRULE2(this.variableAccess);
          this.CONSUME(lexer.RParen);
        },
      },
    ]);

    this.CONSUME(lexer.LCurly);

    this.AT_LEAST_ONE(() => {
      this.SUBRULE(this.caseStatement);
    });

    this.OPTION(() => {
      this.SUBRULE(this.defaultStatement);
    });

    this.CONSUME(lexer.RCurly);
  });

  caseStatement = this.RULE("caseStatement", () => {
    this.CONSUME(lexer.CaseKeyword);

    this.OR([
      { ALT: () => this.CONSUME(lexer.StringLiteral) },
      { ALT: () => this.SUBRULE(this.variableAccess) },
    ]);

    this.CONSUME(lexer.DoKeyword);

    this.OR2([
      { ALT: () => this.SUBRULE(this.block) },
      {
        ALT: () => {
          this.CONSUME(lexer.Colon);
          this.SUBRULE(this.statement);
        },
      },
    ]);
  });

  defaultStatement = this.RULE("defaultStatement", () => {
    this.CONSUME(lexer.DefaultKeyword);
    this.CONSUME2(lexer.DoKeyword);

    this.OR([
      { ALT: () => this.SUBRULE(this.block) },
      {
        ALT: () => {
          this.CONSUME(lexer.Colon);
          this.SUBRULE(this.statement);
        },
      },
    ]);
  });

  // ======================= EXPRESSIONS RULES =======================

  expression = this.RULE("expression", () => {
    this.SUBRULE(this.ternaryExpression);
  });

  ternaryExpression = this.RULE("ternaryExpression", () => {
    this.SUBRULE(this.additionExpression);

    this.OPTION(() => {
      this.CONSUME(lexer.Question);
      this.SUBRULE(this.expression);
      this.CONSUME(lexer.Colon);
      this.SUBRULE2(this.expression);
    });
  });

  additionExpression = this.RULE("additionExpression", () => {
    this.SUBRULE(this.multiplicationExpression);

    this.MANY({
      DEF: () => {
        this.CONSUME(lexer.AdditiveOperator);
        this.SUBRULE2(this.multiplicationExpression);
      },
    });
  });

  multiplicationExpression = this.RULE("multiplicationExpression", () => {
    this.SUBRULE(this.logicalExpression);

    this.MANY({
      DEF: () => {
        this.CONSUME(lexer.MultiplicativeOperator);
        this.SUBRULE2(this.logicalExpression);
      },
    });
  });

  logicalExpression = this.RULE("logicalExpression", () => {
    this.SUBRULE(this.relationalExpression);

    this.MANY({
      DEF: () => {
        this.CONSUME(lexer.LogicalOperator);
        this.SUBRULE2(this.relationalExpression);
      },
    });
  });

  relationalExpression = this.RULE("relationalExpression", () => {
    this.SUBRULE(this.unaryExpression);

    this.MANY({
      DEF: () => {
        this.CONSUME(lexer.RelationalOperator);
        this.SUBRULE2(this.unaryExpression);
      },
    });
  });

  unaryExpression = this.RULE("unaryExpression", () => {
    this.OPTION(() => this.CONSUME(lexer.UnaryPrefixOperator));

    this.OR([
      { ALT: () => this.CONSUME(lexer.Literal) },
      { ALT: () => this.SUBRULE(this.variableAccess) },
      { ALT: () => this.SUBRULE(this.parenthesisExpression) },
    ]);
  });

  parenthesisExpression = this.RULE("parenthesisExpression", () => {
    this.CONSUME(lexer.LParen);
    this.SUBRULE(this.expression);
    this.CONSUME(lexer.RParen);
  });

  assignmentExpression = this.RULE("assignmentExpression", () => {
    this.SUBRULE(this.variableAccess);

    this.OR([
      {
        ALT: () => {
          this.CONSUME(lexer.AssignmentOperator);
          this.SUBRULE(this.expression);
        },
      },
      { ALT: () => this.CONSUME(lexer.UnarySuffixOperator) },
    ]);
  });

  printExpression = this.RULE("printExpression", () => {
    this.CONSUME(lexer.PrintKeyword);

    this.AT_LEAST_ONE_SEP({
      DEF: () => this.SUBRULE(this.expression),
      SEP: lexer.Comma,
    });

    this.CONSUME(lexer.SemiColon);
  });

  readExpression = this.RULE("readExpression", () => {
    this.CONSUME(lexer.ReadKeyword);

    this.AT_LEAST_ONE_SEP({
      DEF: () => this.SUBRULE(this.variableAccess),
      SEP: lexer.Comma,
    });

    this.CONSUME(lexer.SemiColon);
  });

  // ======================= MISCELLANEOUS =======================

  type = this.RULE("type", () => {
    this.OR([
      { ALT: () => this.CONSUME(lexer.PrimitiveTypes) },
      {
        ALT: () => {
          this.CONSUME(lexer.ArrayType);
          this.SUBRULE(this.arrayAccessSuffix);
          this.CONSUME(lexer.OfType);
          this.CONSUME2(lexer.PrimitiveTypes);
        },
      },
      {
        ALT: () => {
          this.OR2([
            { ALT: () => this.CONSUME(lexer.TextType) },
            { ALT: () => this.CONSUME(lexer.CharType) },
          ]);
          this.OPTION(() => this.SUBRULE2(this.arrayAccessSuffix));
        },
      },
    ]);
  });

  variableDeclarator = this.RULE("variableDeclarator", () => {
    this.AT_LEAST_ONE_SEP({
      DEF: () => this.CONSUME(lexer.Identifier),
      SEP: lexer.Comma,
    });

    this.CONSUME(lexer.Colon);
    this.SUBRULE(this.type);
  });

  variableAccess = this.RULE("variableAccess", () => {
    this.SUBRULE(this.qualifiedIdentifier);
    this.OPTION(() => this.SUBRULE(this.arrayAccessSuffix));
  });

  typeDeclarator = this.RULE("typeDeclarator", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.enumeratorDeclarator) },
      { ALT: () => this.SUBRULE(this.structDeclarator) },
    ]);
  });

  enumeratorDeclarator = this.RULE("enumeratorDeclarator", () => {
    this.CONSUME(lexer.EnumType);
    this.CONSUME(lexer.LCurly);

    this.AT_LEAST_ONE_SEP({
      DEF: () => {
        this.SUBRULE(this.enumaratorEntry);
      },
      SEP: lexer.Comma,
    });

    this.CONSUME(lexer.RCurly);
  });

  enumaratorEntry = this.RULE("enumaratorEntry", () => {
    this.CONSUME(lexer.Identifier);
    this.OPTION(() => {
      this.CONSUME(lexer.AssignmentOperator);

      this.OR([
        { ALT: () => this.CONSUME(lexer.NumberLiteral) },
        { ALT: () => this.CONSUME(lexer.StringLiteral) },
      ]);
    });
  });

  structDeclarator = this.RULE("structDeclarator", () => {
    this.CONSUME(lexer.StructType);
    this.CONSUME(lexer.LCurly);

    this.AT_LEAST_ONE(() => {
      this.SUBRULE(this.structProperty);
    });

    this.CONSUME(lexer.RCurly);
  });

  structProperty = this.RULE("structProperty", () => {
    this.CONSUME(lexer.Identifier);
    this.CONSUME(lexer.Colon);
    this.SUBRULE(this.type);
    this.CONSUME(lexer.SemiColon);
  });

  qualifiedIdentifier = this.RULE("qualifiedIdentifier", () => {
    this.CONSUME(lexer.Identifier);

    this.MANY(() => {
      this.CONSUME(lexer.Dot);
      this.CONSUME2(lexer.Identifier);
    });
  });

  arrayAccessSuffix = this.RULE("arrayAccessSuffix", () => {
    this.AT_LEAST_ONE(() => {
      this.SUBRULE(this.arrayAccess);
    });
  });

  arrayAccess = this.RULE("arrayAccess", () => {
    this.CONSUME(lexer.LSquare);
    this.SUBRULE(this.expression);
    this.CONSUME(lexer.RSquare);

    this.OPTION(() => {
      this.CONSUME(lexer.Dot);
      this.SUBRULE2(this.variableAccess);
    });
  });

  block = this.RULE("block", () => {
    this.CONSUME(lexer.LCurly);

    this.AT_LEAST_ONE(() => this.SUBRULE(this.statement));

    this.CONSUME(lexer.RCurly);
  });

  mostEnclosiveCstNodeByStartOffset: EnclosiveNodes = {};
  mostEnclosiveCstNodeByEndOffset: EnclosiveNodes = {};

  constructor() {
    super(getTokens(), {
      recoveryEnabled: true,
      maxLookahead: 3,
      nodeLocationTracking: "full",
      errorMessageProvider,
    });

    this.mostEnclosiveCstNodeByStartOffset = {};
    this.mostEnclosiveCstNodeByEndOffset = {};

    this.performSelfAnalysis();
  }

  /**
   * This method has been mixed into the class,
   * but it is not declared in the TypeScript type.
   * The call to `super.cstPostNonTerminal()` works correctly at runtime,
   * though it will raise a TypeScript error.
   * To ignore this, we need to use the '@ts-ignore' directive.
   *
   * @linkcode chevrotain/src/parse/parser/traits/tree_builder.ts
   */
  cstPostNonTerminal(ruleCstResult: CstNode, ruleName: string) {
    // @ts-ignore
    if (this.isBackTracking()) {
      return;
    }

    // @ts-ignore
    super.cstPostNonTerminal(ruleCstResult, ruleName);

    if (!ruleCstResult.location || !ruleCstResult.location.endOffset) return;

    this.mostEnclosiveCstNodeByStartOffset[ruleCstResult.location.startOffset] =
      ruleCstResult;
    this.mostEnclosiveCstNodeByEndOffset[ruleCstResult.location.endOffset] =
      ruleCstResult;
  }
}
