import {
  AssignmentOperator,
  Equals,
  LCurly,
  RCurly,
  RSquare,
  SemiColon,
} from "@/grammar/lexer/tokens";
import { getRuleName } from "@/utils/i18n";
import { tokenLabel, type IParserErrorMessageProvider } from "chevrotain";

type MessageProvider = IParserErrorMessageProvider["buildMismatchTokenMessage"];

export const buildMismatchTokenMessage: MessageProvider = (options) => {
  const { expected, actual, ruleName: rawRuleName } = options;
  const expectedLabel = tokenLabel(expected);
  const ruleName = getRuleName(rawRuleName);

  switch (expected.name) {
    case SemiColon.name:
      return `É esperado um ponto e vírgula (;) ao final da regra de ${ruleName}.`;
    case LCurly.name:
      return `É esperado um bloco de código delimitado por chaves: { }.`;
    case RCurly.name:
      return `É esperado uma chave fechada '}' que corresponde a um fim de um bloco.`;
    case RSquare.name:
      return `É esperado um colchete fechado ']' que corresponde a um colchete aberto '['.`;
    case AssignmentOperator.name: {
      const suffix =
        actual.tokenType === Equals
          ? " O caractere (=) é um operador de comparação (igualdade)."
          : "";
      return `É esperado o operador de atribuição (<-).${suffix}`;
    }
    default:
      return `É esperado o token (${expectedLabel}), mas foi encontrado o token "${actual.image}".`;
  }
};
