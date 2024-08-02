import { lexer } from "@/grammar/lexer";
import { FemaScriptLanguageParser, type EntryPoint } from "@/grammar/parser";
import type { CstNodeTypes } from "@/types/cst";
import { handleLexErrors, handleParserErrors } from "@/utils";

const parser = new FemaScriptLanguageParser();

const visitor = parser.getBaseCstVisitorConstructor();
const visitorWithDefaults = parser.getBaseCstVisitorConstructorWithDefaults();

const parse = <Entry extends EntryPoint = "algorithm">(
  inputText: string,
  entryPoint: Entry = "algorithm" as Entry
) => {
  const { tokens, errors } = lexer.tokenize(inputText);

  handleLexErrors(errors);

  parser.input = tokens;

  const cst = parser[entryPoint]();

  handleParserErrors(parser.errors);

  return cst as CstNodeTypes[Entry];
};

export default {
  parse,
  visitor,
  visitorWithDefaults,
};
