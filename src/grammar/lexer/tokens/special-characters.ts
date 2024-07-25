import { add as TOKEN } from "../tokens.registry";

export const Exclamation = TOKEN({
  name: "Exclamation",
  pattern: /!/,
  label: "'!'",
  textmateScope: "keyword.operator.logical",
});

export const Tilde = TOKEN({
  name: "Tilde",
  pattern: /\~/,
  label: "'~'",
  textmateScope: "keyword.operator.logical",
});

export const Dot = TOKEN({
  name: "Dot",
  pattern: /\./,
  label: "'.'",
  textmateScope: "meta.delimiter.decimal.period",
});

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

export const Comma = TOKEN({
  name: "Comma",
  pattern: /,/,
  label: "','",
  textmateScope: "punctuation.separator.comma",
});

export const Colon = TOKEN({
  name: "Colon",
  pattern: /:/,
  label: "':'",
  textmateScope: "keyword.operator.type.annotation",
});

export const SemiColon = TOKEN({
  name: "SemiColon",
  pattern: /;/,
  label: "';'",
  textmateScope: "punctuation.terminator.statement",
});

export const Equals = TOKEN({
  name: "Equals",
  pattern: /\=/,
  label: "'='",
  textmateScope: "keyword.operator.comparison",
});

export const Star = TOKEN({
  name: "Star",
  pattern: /\*/,
  label: "'*'",
  textmateScope: "keyword.operator.arithmetic",
});

export const Plus = TOKEN({
  name: "Plus",
  pattern: /\+/,
  label: "'+'",
  textmateScope: "keyword.operator.arithmetic",
});

export const Minus = TOKEN({
  name: "Minus",
  pattern: /\-/,
  label: "'-'",
  textmateScope: "keyword.operator.arithmetic",
});

export const Slash = TOKEN({
  name: "Slash",
  pattern: /\//,
  label: "'/'",
  textmateScope: "keyword.operator.arithmetic",
});

export const GreaterThan = TOKEN({
  name: "GreaterThan",
  pattern: /\>/,
  label: "'>'",
  textmateScope: "keyword.operator.relational",
});

export const LessThan = TOKEN({
  name: "LessThan",
  pattern: /\</,
  label: "'<'",
  textmateScope: "keyword.operator.relational",
});
