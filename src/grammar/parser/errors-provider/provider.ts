import type { IParserErrorMessageProvider } from "chevrotain";
import { buildEarlyExitMessage } from "./early-exit";
import { buildMismatchTokenMessage } from "./mismatch-token";
import { buildNoViableAltMessage } from "./no-viable-alt";
import { buildNotAllInputParsedMessage } from "./not-all-input";

export const errorMessageProvider: IParserErrorMessageProvider = {
  buildMismatchTokenMessage,
  buildNotAllInputParsedMessage,
  buildNoViableAltMessage,
  buildEarlyExitMessage,
};
