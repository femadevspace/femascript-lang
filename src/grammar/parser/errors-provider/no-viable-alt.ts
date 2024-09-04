import { tokenLabel, type IParserErrorMessageProvider } from "chevrotain";

type MessageProvider = IParserErrorMessageProvider["buildNoViableAltMessage"];

export const buildNoViableAltMessage: MessageProvider = (options) => {
  const { expectedPathsPerAlt, actual } = options;
  const message = "É esperado um dos seguintes tokens:";
  const expectedRules = expectedPathsPerAlt
    .flat()
    .map((path, idx) => `  ${idx + 1}. ${tokenLabel(path[0])}`)
    .join("\n");
  const suffix = `\nMas foi encontrado o token "${actual[0].image}".`;

  return [message, expectedRules, suffix].join("\n");
};
