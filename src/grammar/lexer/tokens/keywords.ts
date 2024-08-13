import { resolveCategories } from "@/utils";
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
  pattern: /\b(ALGORIT(HM|MO))\b/,
  textmateScope: "keyword.scope.algorithm",
});

export const TypeKeyword = TOKEN({
  name: "Type",
  pattern: /\b(TIPO|TYPE)\b/,
  textmateScope: "storage.type",
});

export const ConstantKeyword = TOKEN({
  name: "Constant",
  pattern: /\b(CONST(ANT(S|ES))?)\b/,
  textmateScope: "storage.type",
});

export const VariableKeyword = TOKEN({
  name: "Variable",
  pattern: /\b(VAR(I(([AÁ]VEIS)|(ABLES)))?)\b/,
  textmateScope: "storage.type",
});

export const StartKeyword = TOKEN({
  name: "Start",
  pattern: /\b(START|IN[IÍ]CIO)\b/,
  textmateScope: "keyword.scope.geral",
});

export const EndKeyword = TOKEN({
  name: "End",
  pattern: /\b(END|FIM)\.?/,
  textmateScope: "keyword.scope.geral",
});

export const ElseKeyword = TOKEN({
  name: "Else",
  pattern: /\b(ELSE|SEN[AÃ]O)\b/,
  textmateScope: "keyword.control.conditional",
});

export const IfKeyword = TOKEN({
  name: "If",
  pattern: /\b(SE|IF)\b/,
  textmateScope: "keyword.control.conditional",
});

export const ThenKeyword = TOKEN({
  name: "Then",
  pattern: /\b(THEN|ENT[AÃ]O)\b/,
  textmateScope: "keyword.control.conditional",
});

export const DoKeyword = TOKEN({
  name: "Do",
  pattern: /\b(DO|FA[CÇ]A)\b/,
  textmateScope: "keyword.control.loop",
});

export const WhileKeyword = TOKEN({
  name: "While",
  pattern: /\b(WHILE|ENQUANTO)\b/,
  textmateScope: "keyword.control.loop",
});

export const ForKeyword = TOKEN({
  name: "For",
  pattern: /\b(FOR|PARA)\b/,
  textmateScope: "keyword.control.loop",
});

export const SwitchKeyword = TOKEN({
  name: "Switch",
  pattern: /\b(CHECK|TEST[E]?|AVALIE|ANALISE)\b/,
  textmateScope: "keyword.control.switch",
});

export const CaseKeyword = TOKEN({
  name: "Case",
  pattern: /\b(WHEN|CAS[EO]|QUANDO)\b/,
  textmateScope: "keyword.control.switch",
});

export const DefaultKeyword = TOKEN({
  name: "Default",
  pattern: /\b(?:DEFAULT|PADR[AÃ]O|CASO_?CONTR[AÁ]RIO)\b/,
  textmateScope: "keyword.control.switch",
});

export const NotKeyword = TOKEN({
  name: "NotKeyword",
  pattern: /\b(not|n[aã]o)\b/,
  label: "'not'",
  categories: [UnaryPrefixOperator],
  textmateScope: "keyword.operator.logical",
});

export const OrKeyword = TOKEN({
  name: "OrKeyword",
  pattern: /\b(OR|OU)\b/,
  categories: [LogicalOperator],
  textmateScope: "keyword.operator.logical",
});

export const AndKeyword = TOKEN({
  name: "AndKeyword",
  pattern: /\b(AND|E)\b/,
  categories: [LogicalOperator],
  textmateScope: "keyword.operator.logical",
});

export const PrintKeyword = TOKEN({
  name: "Print",
  pattern: /\b(PRINT|IMPRIM(A|IR)|WRITE|ESCREV(A|ER))\b/,
  textmateScope: "support.function.io",
});

export const ReadKeyword = TOKEN({
  name: "Read",
  pattern: /\b(READ|LE(R|IA))\b/,
  textmateScope: "support.function.io",
});
