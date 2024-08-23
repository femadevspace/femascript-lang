import { parse, Production } from "@/grammar";
import { DeepPartial, flatten, mergeDeep } from "@/utils/nested";
import { FemaScriptFormatterVisitor } from "./formatter";
import { NONE } from "./rules/whitespaces";
import { defaultSettings, Settings } from "./settings";
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
) => {
  const options = mergeDeep(defaultSettings, settings);
  const indentState = createIndentationState();

  const { cst } = parse(input, entryPoint);
  if (!cst) return "";

  const result = new FemaScriptFormatterVisitor(options).visit(cst);

  return flatten(result)
    .map((node) => {
      if (node === null) return NONE;
      if (typeof node === "string") return node;
      return node(options, indentState);
    })
    .join("")
    .concat("\n");
};
