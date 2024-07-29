import { resolveCategories } from "@/utils/tokens";
import { Lexer } from "chevrotain";
import { createAndRegisterToken, type TokenConfig } from "../tokens-registry";
import { LogicalOperator, UnaryPrefixOperator } from "./operators";

export const RestrictedKeyword = createAndRegisterToken({
  name: "RestrictedKeyword",
  pattern: Lexer.NA,
  skipTextmateScope: true,
});

const TOKEN = ({ categories, ...rest }: TokenConfig) =>
  createAndRegisterToken({
    ...rest,
    categories: resolveCategories(categories, [RestrictedKeyword]),
  });

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

export const SwitchKeyword = TOKEN({
  name: "Switch",
  pattern: /\b(CHECK|TEST|TESTE|AVALIE|ANALISE)/,
  textmateScope: "keyword.control.switch",
});

export const CaseKeyword = TOKEN({
  name: "Case",
  pattern: /\b(WHEN|CASE|QUANDO|CASO)/,
  textmateScope: "keyword.control.switch",
});

export const DefaultKeyword = TOKEN({
  name: "Default",
  pattern: /\b(?:DEFAULT|PADR[AÃ]O|CASO_?CONTR[AÁ]RIO)/,
  textmateScope: "keyword.control.switch",
});

export const NotKeyword = TOKEN({
  name: "NotKeyword",
  pattern: /\b(not|nao|não)/,
  label: "'not'",
  categories: [UnaryPrefixOperator],
  textmateScope: "keyword.operator.logical",
});

export const OrKeyword = TOKEN({
  name: "Or",
  pattern: /\b(OR|OU)/,
  categories: [LogicalOperator],
  textmateScope: "keyword.operator.logical",
});

export const AndKeyword = TOKEN({
  name: "And",
  pattern: /\b(AND|E)/,
  categories: [LogicalOperator],
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
