import { type IParserErrorMessageProvider } from "chevrotain";

type MessageProvider =
  IParserErrorMessageProvider["buildNotAllInputParsedMessage"];

export const buildNotAllInputParsedMessage: MessageProvider = (options) => {
  const redundantToken = options.firstRedundant.image;

  return `Entrada redundante, esperando token 'Fim do Arquivo' (EOF), mas foi encontrado: ${redundantToken}.`;
};
