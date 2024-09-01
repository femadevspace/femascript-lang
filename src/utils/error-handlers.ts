import type { ILexingError, IRecognitionException } from "chevrotain";

export class PositionableMessage extends Error {
  constructor(
    public override message: string,
    public startLine: number,
    public startChar: number,
    public endLine: number,
    public endChar: number
  ) {
    super();
  }
}

export const handleLexErrors = (errors: ILexingError[]) => {
  if (errors.length > 0) {
    const capturedErrors: PositionableMessage[] = [];

    for (const error of errors) {
      let { line, column, message } = error;

      line ??= 0;
      column ??= 0;

      capturedErrors.push(
        new PositionableMessage(message, line, column, line, column + 1)
      );
    }

    throw capturedErrors;
  }
};

export const handleParserErrors = (errors: IRecognitionException[]) => {
  if (errors.length > 0) {
    const capturedErrors: PositionableMessage[] = [];

    for (const error of errors) {
      let { image, startLine, startColumn } = error.token;
      startLine ??= 0;
      startColumn ??= 0;

      const message = error.message;
      const endLine = startLine;
      const endColumn = startColumn + image.length;

      capturedErrors.push(
        new PositionableMessage(
          message,
          startLine,
          startColumn,
          endLine,
          endColumn
        )
      );
    }

    throw capturedErrors;
  }
};
