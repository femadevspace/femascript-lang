import { createAndRegisterToken as TOKEN } from "../tokens-registry";

export const AlgorithmKeyword = TOKEN({
  name: "Algorithm",
  pattern: /\b(ALGORITHM|ALGORITMO)/,
  textmateScope: "keyword.scope.algorithm",
});

export const ConstantKeyword = TOKEN({
  name: "Constant",
  pattern: /\b(CONSTANTS|CONSTANTES|CONST)/,
  textmateScope: "storage.type",
});

export const VariableKeyword = TOKEN({
  name: "Variable",
  pattern: /\b(VARIABLES|VARIAVEIS|VARIÁVEIS|VAR)/,
  textmateScope: "storage.type",
});

export const StartKeyword = TOKEN({
  name: "Start",
  pattern: /\b(START|INICIO|INÍCIO)/,
  textmateScope: "keyword.scope.geral",
});

export const EndKeyword = TOKEN({
  name: "End",
  pattern: /\b(END|FIM)/,
  textmateScope: "keyword.scope.geral",
});

export const ElseKeyword = TOKEN({
  name: "Else",
  pattern: /\b(ELSE|SENAO|SENÃO)/,
  textmateScope: "keyword.control.conditional",
});

export const IfKeyword = TOKEN({
  name: "If",
  pattern: /\b(SE|IF)/,
  textmateScope: "keyword.control.conditional",
});

export const ThenKeyword = TOKEN({
  name: "Then",
  pattern: /\b(THEN|ENTAO|ENTÃO)/,
  textmateScope: "keyword.conditional",
});

export const DoKeyword = TOKEN({
  name: "Do",
  pattern: /\b(DO|FACA|FAÇA)/,
  textmateScope: "keyword.control.loop",
});

export const WhileKeyword = TOKEN({
  name: "While",
  pattern: /\b(WHILE|ENQUANTO)/,
  textmateScope: "keyword.control.loop",
});

export const ForKeyword = TOKEN({
  name: "For",
  pattern: /\b(FOR|PARA)/,
  textmateScope: "keyword.control.loop",
});

export const OrKeyword = TOKEN({
  name: "Or",
  pattern: /\b(OR|OU|\|\|)/,
  textmateScope: "keyword.operator.logical",
});

export const AndKeyword = TOKEN({
  name: "And",
  pattern: /\b(AND|E|&&)/,
  textmateScope: "keyword.operator.logical",
});

export const PrintKeyword = TOKEN({
  name: "Print",
  pattern: /\b(PRINT|IMPRIMA|IMPRIMIR|WRITE|ESCREVA|ESCREVER)/,
  textmateScope: "support.function.io",
});

export const ReadKeyword = TOKEN({
  name: "Read",
  pattern: /\b(READ|LEIA|LER)/,
  textmateScope: "support.function.io",
});
