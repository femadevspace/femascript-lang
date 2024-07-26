import type { ILexingError, IRecognitionException } from "chevrotain";

const printErrors = (context: string, messages: string[]) => {
  const errorLiteral = messages.length > 1 ? "errors" : "error";
  let message = `${context} ${errorLiteral}: \n`;

  for (const error of messages) message += `${error}\n`;

  throw new Error(message);
};

export const handleLexErrors = (errors: ILexingError[]) => {
  if (errors.length > 0) {
    const messages = errors.map(
      ({ line, column, message }) => `(${line}:${column}) ${message}`
    );

    printErrors("Lexer", messages);
  }
};

export const handleParserErrors = (errors: IRecognitionException[]) => {
  if (errors.length > 0) {
    const {
      token: { startLine, startColumn },
      name,
      message,
    } = errors[0];

    const position =
      startLine && startColumn ? `[${startLine}:${startColumn}]` : "";

    printErrors("Parser", [`(${name}) ${message} ${position}`]);
  }
};
