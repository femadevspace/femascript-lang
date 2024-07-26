import { CstParser } from "chevrotain";
import { tokensRegistry } from "../lexer";
import * as tokens from "../lexer/tokens";

export class Parser extends CstParser {
  constructor() {
    super(tokensRegistry.getAllTokens(), {
      recoveryEnabled: true,
      maxLookahead: 3,
    });

    const $ = this;

    $.RULE("program", () => {
      $.SUBRULE(header);

      $.OPTION(() => {
        $.SUBRULE(constDefinition);
      });

      $.OPTION2(() => {
        $.SUBRULE(varDefinition);
      });

      $.SUBRULE(algorithm);
    });

    const header = $.RULE("header", () => {
      $.CONSUME(tokens.AlgorithmKeyword);
      $.OR([
        { ALT: () => $.CONSUME(tokens.Identifier) },
        { ALT: () => $.CONSUME(tokens.StringLiteral) },
      ]);
      $.OPTION(() => $.CONSUME(tokens.SemiColon));
    });

    const constDefinition = $.RULE("constDefinition", () => {
      $.CONSUME(tokens.ConstantKeyword);
      $.SUBRULE(StrictAssignmentExpression);
      $.CONSUME(tokens.SemiColon);

      $.MANY(() => {
        $.SUBRULE2(StrictAssignmentExpression);
        $.CONSUME2(tokens.SemiColon);
      });
    });

    const varDefinition = $.RULE("varDefinition", () => {
      $.CONSUME(tokens.VariableKeyword);

      $.MANY(() => {
        $.SUBRULE(VariableDeclaration);
      });
    });

    const VariableId = $.RULE("VariableId", () => {
      $.OR([
        {
          ALT: () => {
            $.CONSUME(tokens.Identifier);
            $.SUBRULE(ArrayAccessors);
          },
        },
        { ALT: () => $.CONSUME2(tokens.Identifier) },
      ]);
    });

    const VariableDeclaration = $.RULE("VariableDeclaration", () => {
      $.CONSUME(tokens.Identifier);

      $.MANY(() => {
        $.CONSUME(tokens.Comma);
        $.CONSUME2(tokens.Identifier);
      });

      $.CONSUME(tokens.Colon);

      $.SUBRULE(TypeKeyword);

      $.CONSUME(tokens.SemiColon);
    });

    const AssignmentExpression = $.RULE("AssignmentExpression", () => {
      $.SUBRULE(VariableId);
      $.CONSUME(tokens.AssignmentOperator);
      $.SUBRULE(Expression);
    });

    const StrictAssignmentExpression = $.RULE(
      "StrictAssignmentExpression",
      () => {
        $.CONSUME(tokens.Identifier);
        $.CONSUME(tokens.AssignmentOperator);
        $.SUBRULE(Expression);
      }
    );

    const Value = $.RULE("Value", () => {
      $.OR([
        { ALT: () => $.CONSUME(tokens.Identifier) },
        { ALT: () => $.CONSUME(tokens.NumberLiteral) },
        { ALT: () => $.CONSUME(tokens.StringLiteral) },
        { ALT: () => $.CONSUME(tokens.True) },
        { ALT: () => $.CONSUME(tokens.False) },
        { ALT: () => $.CONSUME(tokens.Null) },
      ]);
    });

    const ArrayAccessor = $.RULE("ArrayAccessor", () => {
      $.CONSUME(tokens.LSquare);
      $.OR([
        { ALT: () => $.CONSUME(tokens.Identifier) },
        { ALT: () => $.CONSUME(tokens.NumberLiteral) },
      ]);
      $.CONSUME(tokens.RSquare);
    });

    const ArrayAccessors = $.RULE("ArrayAccessors", () => {
      $.SUBRULE(ArrayAccessor);

      $.MANY(() => {
        $.SUBRULE2(ArrayAccessor);
      });
    });

    const TypeKeyword = $.RULE("TypeKeyword", () => {
      $.OR([
        { ALT: () => $.CONSUME(tokens.RealType) },
        { ALT: () => $.CONSUME(tokens.IntegerType) },
        { ALT: () => $.CONSUME(tokens.CharType) },
        { ALT: () => $.CONSUME(tokens.TextType) },
        { ALT: () => $.CONSUME(tokens.BooleanType) },
        {
          ALT: () => {
            $.CONSUME(tokens.ArrayType);
            $.SUBRULE(ArrayAccessors);
            $.CONSUME(tokens.OfType);
            $.SUBRULE3(TypeKeyword);
          },
        },
      ]);
    });

    const algorithm = $.RULE("algorithm", () => {
      $.CONSUME(tokens.StartKeyword);

      $.MANY(() => {
        $.SUBRULE(Statement);
      });

      $.CONSUME(tokens.EndKeyword);
    });

    const Statement = $.RULE("Statement", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE(AssignmentExpression);
            $.CONSUME(tokens.SemiColon);
          },
        },
        { ALT: () => $.SUBRULE(Block) },
        { ALT: () => $.SUBRULE(IfStatement) },
        { ALT: () => $.SUBRULE(IterationStatement) },
        { ALT: () => $.SUBRULE(UnaryExpression) },
      ]);
    });

    const Block = $.RULE("Block", () => {
      $.CONSUME(tokens.LCurly);

      $.MANY(() => {
        $.SUBRULE(Statement);
      });

      $.CONSUME(tokens.RCurly);
    });

    const Expression = $.RULE("Expression", () => {
      $.SUBRULE(BinaryExpression);
    });

    const BinaryExpression = $.RULE("BinaryExpression", () => {
      $.SUBRULE(BinaryExpressionDeclaration);

      $.MANY(() => {
        $.SUBRULE2(Operators);
        $.SUBRULE3(BinaryExpressionDeclaration);
      });
    });

    const BinaryExpressionDeclaration = $.RULE(
      "BinaryExpressionDeclaration",
      () => {
        $.OR([
          { ALT: () => $.SUBRULE(Value) },
          {
            ALT: () => {
              $.OPTION(() => $.SUBRULE(NotOperator));

              $.CONSUME(tokens.LParen);
              $.SUBRULE(Expression);
              $.CONSUME(tokens.RParen);
            },
          },
        ]);
      }
    );

    const Operators = $.RULE("Operators", () => {
      $.OR([
        { ALT: () => $.SUBRULE(RelationalOperator) },
        { ALT: () => $.SUBRULE(MultiplicativeOperator) },
        { ALT: () => $.SUBRULE(AdditiveOperator) },
        { ALT: () => $.SUBRULE(LogicalOperator) },
      ]);
    });

    const RelationalOperator = $.RULE("RelationalOperator", () => {
      $.OR([
        {
          ALT: () => {
            $.CONSUME2(tokens.GreaterThan);
            $.CONSUME3(tokens.Equals);
          },
        },
        {
          ALT: () => {
            $.CONSUME4(tokens.LessThan);
            $.CONSUME5(tokens.Equals);
          },
        },
        {
          ALT: () => {
            $.SUBRULE(NotOperator);
            $.CONSUME7(tokens.Equals);
          },
        },
        { ALT: () => $.CONSUME(tokens.GreaterThan) },
        { ALT: () => $.CONSUME(tokens.LessThan) },
        { ALT: () => $.CONSUME(tokens.Equals) },
      ]);
    });

    const NotOperator = $.RULE("NotOperator", () => {
      $.OR([
        { ALT: () => $.CONSUME(tokens.Exclamation) },
        { ALT: () => $.CONSUME(tokens.Tilde) },
        { ALT: () => $.CONSUME(tokens.Not) },
      ]);
    });

    const MultiplicativeOperator = $.RULE("MultiplicativeOperator", () => {
      $.OR([
        { ALT: () => $.CONSUME(tokens.Star) },
        { ALT: () => $.CONSUME(tokens.Slash) },
      ]);
    });

    const AdditiveOperator = $.RULE("AdditiveOperator", () => {
      $.OR([
        { ALT: () => $.CONSUME(tokens.Plus) },
        { ALT: () => $.CONSUME(tokens.Minus) },
      ]);
    });

    const LogicalOperator = $.RULE("LogicalOperator", () => {
      $.OR([
        { ALT: () => $.CONSUME(tokens.AndKeyword) },
        { ALT: () => $.CONSUME(tokens.OrKeyword) },
      ]);
    });

    const IfStatement = $.RULE("IfStatement", () => {
      $.CONSUME(tokens.IfKeyword);
      $.CONSUME2(tokens.LParen);
      $.SUBRULE(Expression);
      $.CONSUME3(tokens.RParen);
      $.CONSUME4(tokens.ThenKeyword);
      $.SUBRULE(Block);

      $.OPTION(() => {
        $.SUBRULE2(ElseStatement);
      });
    });

    const ElseStatement = $.RULE("ElseStatement", () => {
      $.CONSUME(tokens.ElseKeyword);
      $.OR([
        { ALT: () => $.SUBRULE(IfStatement) },
        { ALT: () => $.SUBRULE(Block) },
      ]);
    });

    const IterationStatement = $.RULE("IterationStatement", () => {
      $.OR([
        {
          ALT: () => {
            $.CONSUME(tokens.DoKeyword);
            $.SUBRULE(Block);
            $.CONSUME(tokens.WhileKeyword);
            $.CONSUME(tokens.LParen);
            $.SUBRULE(Expression);
            $.CONSUME(tokens.RParen);
            $.CONSUME(tokens.SemiColon);
          },
        },
        {
          ALT: () => {
            $.CONSUME2(tokens.WhileKeyword);
            $.CONSUME2(tokens.LParen);
            $.SUBRULE2(Expression);
            $.CONSUME2(tokens.RParen);
            $.CONSUME2(tokens.DoKeyword);
            $.SUBRULE2(Block);
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.ForKeyword);
            $.CONSUME3(tokens.LParen);
            $.SUBRULE(AssignmentExpression);
            $.CONSUME2(tokens.SemiColon);
            $.SUBRULE3(Expression);
            $.CONSUME3(tokens.SemiColon);
            $.SUBRULE2(AssignmentExpression);
            $.CONSUME3(tokens.RParen);
            $.CONSUME3(tokens.DoKeyword);
            $.SUBRULE3(Block);
          },
        },
      ]);
    });

    const UnaryExpression = $.RULE("UnaryExpression", () => {
      $.OR([
        { ALT: () => $.SUBRULE(PrintOperator) },
        { ALT: () => $.SUBRULE(ReadOperator) },
      ]);
    });

    const PrintOperator = $.RULE("PrintOperator", () => {
      $.CONSUME(tokens.PrintKeyword);
      $.SUBRULE(Expression);

      $.MANY(() => {
        $.CONSUME(tokens.Comma);
        $.SUBRULE2(Expression);
      });

      $.CONSUME(tokens.SemiColon);
    });

    const ReadOperator = $.RULE("ReadOperator", () => {
      $.CONSUME(tokens.ReadKeyword);
      $.SUBRULE(VariableId);

      $.MANY(() => {
        $.CONSUME(tokens.Comma);
        $.SUBRULE2(VariableId);
      });

      $.CONSUME(tokens.SemiColon);
    });

    this.performSelfAnalysis();
  }
}
