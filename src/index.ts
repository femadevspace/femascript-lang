import { lexer } from "@/grammar/lexer";
import { AlgoritmoLanguageParser } from "@/grammar/parser";
import type { CstNodeTypes, ParserEntryPoint } from "@/types/cst";
import { handleLexErrors, handleParserErrors } from "@/utils";

const parser = new AlgoritmoLanguageParser();

const visitor = parser.getBaseCstVisitorConstructor();
const visitorWithDefaults = parser.getBaseCstVisitorConstructorWithDefaults();

const parse = <EntryPoint extends ParserEntryPoint = "program">(
  inputText: string,
  entryPoint: EntryPoint = "program" as EntryPoint
) => {
  const { tokens, errors } = lexer.tokenize(inputText);

  handleLexErrors(errors);

  parser.input = tokens;

  const rule = parser[entryPoint as keyof typeof parser] as Function;
  const cst = rule.bind(parser)();

  handleParserErrors(parser.errors);

  return cst as CstNodeTypes[EntryPoint];
};

export default {
  parse,
  visitor,
  visitorWithDefaults,
};
