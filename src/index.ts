import { lexer } from "@/grammar/lexer";
import { AlgoritmoLanguageParser } from "@/grammar/parser";
import { handleLexErrors, handleParserErrors } from "@/utils";
import type { CstNode } from "chevrotain";
import type { ParserEntryPoint } from "./types/cst";

const parser = new AlgoritmoLanguageParser();

const visitor = parser.getBaseCstVisitorConstructor();
const visitorWithDefaults = parser.getBaseCstVisitorConstructorWithDefaults();

const parse = (inputText: string, entryPoint: ParserEntryPoint = "program") => {
  const { tokens, errors } = lexer.tokenize(inputText);

  handleLexErrors(errors);

  parser.input = tokens;

  const rule = parser[entryPoint as keyof AlgoritmoLanguageParser] as Function;
  const cst = (rule.bind(parser) as Function)() as CstNode;

  handleParserErrors(parser.errors);

  return cst;
};

export default {
  parse,
  visitor,
  visitorWithDefaults,
};
