import { lexer } from "@/grammar/lexer";
import { FemaScriptLanguageParser, type EntryPoint } from "@/grammar/parser";
import type { CstNodeTypes } from "@/types/cst";
import { handleLexErrors, handleParserErrors } from "@/utils";

const parser = new FemaScriptLanguageParser();

const BaseVisitor = parser.getBaseCstVisitorConstructor();
const BaseVisitorWithDefaults =
  parser.getBaseCstVisitorConstructorWithDefaults();

const parse = <Entry extends EntryPoint = "algorithm">(
  inputText: string,
  entryPoint: Entry = "algorithm" as Entry
) => {
  const { tokens, errors, groups } = lexer.tokenize(inputText);

  handleLexErrors(errors);

  parser.input = tokens;

  const cst = parser[entryPoint]() as CstNodeTypes[Entry];

  handleParserErrors(parser.errors);

  return { cst, groups };
};

export default {
  parse,
  BaseVisitor,
  BaseVisitorWithDefaults,
};
