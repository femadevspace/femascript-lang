import { lexer } from "@/grammar";
import type { CstNodeTypes } from "@/types/cst";
import { handleLexErrors, handleParserErrors } from "@/utils";
import { FemaScriptLanguageParser, type Production } from "./parser";

const parser = new FemaScriptLanguageParser();

export const parse = <Entry extends Production = "algorithm">(
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
