import { createAndRegisterToken as TOKEN } from "../tokens-registry";
import * as op from "./operators";

// =========== Assignment Operators ===========
export const ArrowLeft = TOKEN({
  name: "ArrowLeft",
  pattern: /(<-)/,
  label: "'<-'",
  categories: [op.AssignmentOperator],
  textmateScope: "keyword.operator.relational",
});

// =========== Misc Symbols ===========
export const Dot = TOKEN({
  name: "Dot",
  pattern: /(\.)/,
  label: "'.'",
  textmateScope: "meta.delimiter.decimal.period",
});

export const Comma = TOKEN({
  name: "Comma",
  pattern: /(,)/,
  label: "','",
  textmateScope: "punctuation.separator.comma",
});

export const Colon = TOKEN({
  name: "Colon",
  pattern: /(:)/,
  label: "':'",
  textmateScope: "keyword.operator.type.annotation",
});

export const SemiColon = TOKEN({
  name: "SemiColon",
  pattern: /(;)/,
  label: "';'",
  textmateScope: "punctuation.terminator.statement",
});

// =========== Relational Operators ===========
export const Equals = TOKEN({
  name: "Equals",
  pattern: /(=)/,
  label: "'='",
  categories: [op.RelationalOperator],
  textmateScope: "keyword.operator.comparison",
});

export const NotEquals = TOKEN({
  name: "NotEquals",
  pattern: /(!=)/,
  label: "'!='",
  categories: [op.RelationalOperator],
  textmateScope: "keyword.operator.comparison",
});

export const GreaterEquals = TOKEN({
  name: "GreaterEquals",
  pattern: /(>=)/,
  label: "'>='",
  categories: [op.RelationalOperator],
  textmateScope: "keyword.operator.relational",
});

export const Greater = TOKEN({
  name: "Greater",
  pattern: /(>)/,
  label: "'>'",
  categories: [op.RelationalOperator],
  textmateScope: "keyword.operator.relational",
});

export const LessEquals = TOKEN({
  name: "LessEquals",
  pattern: /(<=)/,
  label: "'<='",
  categories: [op.RelationalOperator],
  textmateScope: "keyword.operator.relational",
});

export const Less = TOKEN({
  name: "Less",
  pattern: /(<)/,
  label: "'<'",
  categories: [op.RelationalOperator],
  textmateScope: "keyword.operator.relational",
});

// =========== Logical Operators ===========
export const Tilde = TOKEN({
  name: "Tilde",
  pattern: /(~)/,
  label: "'~'",
  categories: [op.UnaryPrefixOperator],
  textmateScope: "keyword.operator.logical",
});

export const Exclamation = TOKEN({
  name: "Exclamation",
  pattern: /(!)/,
  label: "'!'",
  categories: [op.UnaryPrefixOperator],
  textmateScope: "keyword.operator.logical",
});

export const Question = TOKEN({
  name: "Question",
  pattern: /(\?)/,
  label: "'?'",
  textmateScope: "keyword.operator.ternary",
});

export const AndAnd = TOKEN({
  name: "AndAnd",
  pattern: /(&&)/,
  label: "'&&'",
  categories: [op.LogicalOperator],
  textmateScope: "keyword.operator.logical",
});

export const And = TOKEN({
  name: "And",
  pattern: /(&)/,
  label: "'&'",
  categories: [op.LogicalOperator],
  textmateScope: "keyword.operator.logical",
});

export const OrOr = TOKEN({
  name: "OrOr",
  pattern: /(\|\|)/,
  label: "'||'",
  categories: [op.LogicalOperator],
  textmateScope: "keyword.operator.logical",
});

export const Or = TOKEN({
  name: "Or",
  pattern: /(\|)/,
  label: "'|'",
  categories: [op.LogicalOperator],
  textmateScope: "keyword.operator.logical",
});

// =========== Arithmetic Operators ===========
export const Star = TOKEN({
  name: "Star",
  pattern: /(\*)/,
  label: "'*'",
  categories: [op.ArithmeticOperator],
  textmateScope: "keyword.operator.arithmetic",
});

export const PlusPlus = TOKEN({
  name: "PlusPlus",
  pattern: /(\+\+)/,
  label: "'++'",
  categories: [op.UnarySuffixOperator],
  textmateScope: "keyword.operator.increment",
});

export const Plus = TOKEN({
  name: "Plus",
  pattern: /(\+)/,
  label: "'+'",
  categories: [op.ArithmeticOperator],
  textmateScope: "keyword.operator.arithmetic",
});

export const MinusMinus = TOKEN({
  name: "MinusMinus",
  pattern: /(--)/,
  label: "'--'",
  categories: [op.UnarySuffixOperator],
  textmateScope: "keyword.operator.decrement",
});

export const Minus = TOKEN({
  name: "Minus",
  pattern: /(\-)/,
  label: "'-'",
  categories: [op.ArithmeticOperator],
  textmateScope: "keyword.operator.arithmetic",
});

export const Slash = TOKEN({
  name: "Slash",
  pattern: /(\/)/,
  label: "'/'",
  categories: [op.ArithmeticOperator],
  textmateScope: "keyword.operator.arithmetic",
});

export const Modulo = TOKEN({
  name: "Modulo",
  pattern: /(%)/,
  label: "'%'",
  categories: [op.ArithmeticOperator],
  textmateScope: "keyword.operator.arithmetic",
});

// =========== Braces Symbols ===========
export const LCurly = TOKEN({
  name: "LCurly",
  pattern: /{/,
  label: "'{'",
  textmateScope: "punctuation.definition.block",
});

export const RCurly = TOKEN({
  name: "RCurly",
  pattern: /}/,
  label: "'}'",
  textmateScope: "punctuation.definition.block",
});

export const LSquare = TOKEN({
  name: "LSquare",
  pattern: /\[/,
  label: "'['",
  textmateScope: "meta.brace.square",
});

export const RSquare = TOKEN({
  name: "RSquare",
  pattern: /]/,
  label: "']'",
  textmateScope: "meta.brace.square",
});

export const LParen = TOKEN({
  name: "LParen",
  pattern: /\(/,
  label: "'('",
  textmateScope: "meta.brace.round",
});

export const RParen = TOKEN({
  name: "RParen",
  pattern: /\)/,
  label: "')'",
  textmateScope: "meta.brace.round",
});
