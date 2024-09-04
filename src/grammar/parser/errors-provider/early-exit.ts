import { getRuleName } from "@/utils/i18n";
import { type IParserErrorMessageProvider } from "chevrotain";
import { Production } from "../parser";

type MessageProvider = IParserErrorMessageProvider["buildEarlyExitMessage"];

/**
 * The "early exit" error occurs when the parser
 * expects a rule to have at least one sub-rule,
 * but it finds nothing.
 */
export const buildEarlyExitMessage: MessageProvider = (options) => {
  const rawRuleName = options.ruleName as Production;
  const ruleName = getRuleName(rawRuleName);

  switch (rawRuleName) {
    case "program":
      return "É esperado ao menos uma expressão ou declaração para o programa.";
    case "switchStatement":
      return `É esperado ao menos um "Quando" (Case) para a regra de ${ruleName}.`;
    case "enumeratorDeclarator":
      return `É esperado ao menos um identificador para a regra de ${ruleName}.`;
    case "printExpression":
    case "readExpression":
      return `É esperado ao menos um argumento para a regra de ${ruleName}.`;
    default:
      return `A regra de ${ruleName} espera ao menos um sub-valor, mas nada foi encontrado.`;
  }
};
