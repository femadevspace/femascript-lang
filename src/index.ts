import { lexer } from "@/grammar/lexer";
import { AlgoritmoLanguageParser } from "@/grammar/parser";
import { handleLexErrors, handleParserErrors } from "@/utils";
import type { CstNode } from "chevrotain";

const parser = new AlgoritmoLanguageParser();

const visitor = parser.getBaseCstVisitorConstructor();
const visitorWithDefaults = parser.getBaseCstVisitorConstructorWithDefaults();

const parse = (inputText: string, entryPoint = "program") => {
  const { tokens, errors } = lexer.tokenize(inputText);

  handleLexErrors(errors);

  parser.input = tokens;

  if (!(entryPoint in parser))
    throw new Error(`Invalid entry point: ${entryPoint}`);

  const rule = parser[entryPoint as keyof AlgoritmoLanguageParser];

  if (typeof rule !== "function")
    throw new Error(`Invalid entry point: ${entryPoint}`);

  const cst = (rule.bind(parser) as Function)() as CstNode;

  handleParserErrors(parser.errors);

  return cst;
};

export default {
  parse,
  visitor,
  visitorWithDefaults,
};
