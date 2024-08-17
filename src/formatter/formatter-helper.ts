import { parse } from "@/grammar";
import { DeepPartial, flatten, mergeDeep } from "@/utils/nested";
import { FemaScriptFormatterVisitor } from "./formatter";
import { defaultSettings, Settings } from "./settings";
import { createIndentationState } from "./utils/indentations";

export const format = (input: string, settings: DeepPartial<Settings> = {}) => {
  const options = mergeDeep(defaultSettings, settings);
  const indentState = createIndentationState();

  const { cst } = parse(input);
  if (!cst) return "";

  const result = new FemaScriptFormatterVisitor().visit(cst);

  return flatten(result)
    .map((node) =>
      typeof node === "string" ? node : node(options, indentState)
    )
    .join("");
};
