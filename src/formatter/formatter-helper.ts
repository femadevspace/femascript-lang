import { parse, Production } from "@/grammar";
import { PositionableMessage } from "@/utils";
import { DeepPartial, flatten } from "@/utils/nested";
import { hasError, Safe } from "@/utils/safe";
import { FemaScriptFormatterVisitor } from "./formatter";
import { NONE } from "./rules/whitespaces";
import { Settings, withDefaults } from "./settings";
import { createIndentationState } from "./utils/indentations";
import * as visitors from "./visitors";

const mixInMethods = () => {
  for (const visitor of Object.values(visitors)) {
    Object.getOwnPropertyNames(visitor.prototype)
      .filter(
        (method) =>
          method !== "constructor" &&
          method !== "visit" &&
          method !== "validateVisitor"
      )
      .forEach((method) => {
        // @ts-ignore
        FemaScriptFormatterVisitor.prototype[method] =
          // @ts-ignore
          visitor.prototype[method];
      });
  }
};
mixInMethods();

export const format = (
  input: string,
  settings: DeepPartial<Settings> = {},
  entryPoint: Production = "algorithm"
): Safe<string, PositionableMessage[]> => {
  const options = withDefaults(settings);
  const indentState = createIndentationState();
  let currentLine = "";

  const cst = parse(input, entryPoint);
  if (hasError(cst)) return cst;

  const setCurrentLine = (line: string | null) => {
    if (!line) return line;
    if (line.includes("\n")) currentLine = line.split("\n").pop()!;
    else currentLine += line;

    return line;
  };

  const visitResult = new FemaScriptFormatterVisitor(options).visit(cst);
  const result = flatten(visitResult)
    .filter((node) => node !== null)
    .map((node) => {
      if (typeof node === "string") return setCurrentLine(node);
      return setCurrentLine(node(options, { indentState, currentLine }));
    })
    .join(NONE)
    .replace(/(\r?\n)+$/, NONE)
    .concat("\n");

  return result;
};
