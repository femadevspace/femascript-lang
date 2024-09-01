import { lexer } from "@/grammar";
import type { CstNodeTypes } from "@/types/cst";
import {
  handleLexErrors,
  handleParserErrors,
  type PositionableMessage,
} from "@/utils";
import { attachComments } from "@/utils/comments";
import type { Safe } from "@/utils/safe";
import { FemaScriptLanguageParser, type Production } from "./parser";

const parser = new FemaScriptLanguageParser();

const BaseVisitor = parser.getBaseCstVisitorConstructor();
const BaseVisitorWithDefaults =
  parser.getBaseCstVisitorConstructorWithDefaults();

const parse = <Entry extends Production = "algorithm">(
  inputText: string,
  entryPoint: Entry = "algorithm" as Entry
): Safe<CstNodeTypes[Entry], PositionableMessage[]> => {
  try {
    const { tokens, errors, groups } = lexer.tokenize(inputText);

    handleLexErrors(errors);

    parser.input = tokens;
    parser.mostEnclosiveCstNodeByStartOffset = {};
    parser.mostEnclosiveCstNodeByEndOffset = {};

    const cst = parser[entryPoint]() as CstNodeTypes[Entry];

    handleParserErrors(parser.errors);

    attachComments(
      tokens,
      groups.comments,
      parser.mostEnclosiveCstNodeByStartOffset,
      parser.mostEnclosiveCstNodeByEndOffset
    );

    return cst;
  } catch (error) {
    return { error: error as PositionableMessage[] };
  }
};

export { BaseVisitor, BaseVisitorWithDefaults, parse };
