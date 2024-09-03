import { generateDts } from "./generate-dts";
import { generateHighlightCode } from "./generate-highlight-grammar";

await Promise.all([
  Bun.write("./src/types/cst.d.ts", generateDts()),
  Bun.write(
    "./extension/highlight/femascript-grammar.tmLanguage.json",
    generateHighlightCode()
  ),
]);
