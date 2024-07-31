import { getTokens } from "@/grammar/lexer";
import * as lexer from "@/grammar/lexer/tokens";
import { CstParser } from "chevrotain";

export type EntryPoint = Exclude<
  keyof AlgoritmoLanguageParser,
  keyof CstParser
>;

export class AlgoritmoLanguageParser extends CstParser {
  // ======================= ALGORITHM STRUCTURE RULES =======================
  algorithm = this.RULE("algorithm", () => {
    this.SUBRULE(this.header);

    this.OPTION(() => {
      this.SUBRULE(this.constantsDeclarators);
    });

    this.OPTION2(() => {
      this.SUBRULE(this.variablesDeclarators);
    });

    this.SUBRULE(this.program);
  });

  header = this.RULE("header", () => {
    this.CONSUME(lexer.AlgorithmKeyword);
    this.CONSUME(lexer.Identifier);

    this.OPTION(() => this.CONSUME(lexer.SemiColon));
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
    this.SUBRULE(this.block);

    this.OPTION(() => this.SUBRULE(this.elseStatement));
  });

  elseStatement = this.RULE("elseStatement", () => {
    this.CONSUME(lexer.ElseKeyword);

    this.OR([
      { ALT: () => this.SUBRULE(this.ifStatement) },
      { ALT: () => this.SUBRULE(this.block) },
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
      this.CONSUME(lexer.CaseKeyword);
      this.OR2([
        { ALT: () => this.CONSUME(lexer.StringLiteral) },
        { ALT: () => this.SUBRULE3(this.variableAccess) },
      ]);
      this.CONSUME(lexer.DoKeyword);

      this.OR3([
        { ALT: () => this.SUBRULE(this.block) },
        {
          ALT: () => {
            this.CONSUME(lexer.Colon);
            this.SUBRULE(this.statement);
          },
        },
      ]);
    });

    this.OPTION(() => {
      this.CONSUME(lexer.DefaultKeyword);
      this.CONSUME2(lexer.DoKeyword);
      this.SUBRULE2(this.block);
    });

    this.CONSUME(lexer.RCurly);
  });

  // ======================= EXPRESSIONS RULES =======================

  expression = this.RULE("expression", () => {
    this.SUBRULE(this.ternaryExpression);
  });

  ternaryExpression = this.RULE("ternaryExpression", () => {
    this.SUBRULE(this.binaryExpression);

    this.OPTION(() => {
      this.CONSUME(lexer.Question);
      this.SUBRULE(this.expression);
      this.CONSUME(lexer.Colon);
      this.SUBRULE2(this.expression);
    });
  });

  binaryExpression = this.RULE("binaryExpression", () => {
    this.SUBRULE(this.unaryExpression);

    this.MANY({
      DEF: () => {
        this.CONSUME(lexer.BinaryOperator);
        this.SUBRULE2(this.unaryExpression);
      },
    });
  });

  unaryExpression = this.RULE("unaryExpression", () => {
    this.OR([
      { ALT: () => this.CONSUME(lexer.Literal) },
      { ALT: () => this.SUBRULE(this.variableAccess) },
      { ALT: () => this.SUBRULE(this.parenthesisExpression) },
    ]);
  });

  parenthesisExpression = this.RULE("parenthesisExpression", () => {
    this.OPTION(() => this.CONSUME(lexer.UnaryPrefixOperator));

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

  variableDeclarator = this.RULE("variableDeclarator", () => {
    this.AT_LEAST_ONE_SEP({
      DEF: () => this.CONSUME(lexer.Identifier),
      SEP: lexer.Comma,
    });

    this.CONSUME(lexer.Colon);

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
    ]);
  });

  variableAccess = this.RULE("variableAccess", () => {
    this.CONSUME(lexer.Identifier);
    this.OPTION(() => this.SUBRULE(this.arrayAccessSuffix));
  });

  arrayAccessSuffix = this.RULE("arrayAccessSuffix", () => {
    this.AT_LEAST_ONE(() => {
      this.CONSUME(lexer.LSquare);

      this.OR([
        { ALT: () => this.CONSUME(lexer.Identifier) },
        { ALT: () => this.CONSUME(lexer.NumberLiteral) },
      ]);

      this.CONSUME(lexer.RSquare);
    });
  });

  block = this.RULE("block", () => {
    this.CONSUME(lexer.LCurly);

    this.AT_LEAST_ONE(() => this.SUBRULE(this.statement));

    this.CONSUME(lexer.RCurly);
  });

  constructor() {
    super(getTokens(), {
      recoveryEnabled: true,
      maxLookahead: 3,
    });

    this.performSelfAnalysis();
  }
}
