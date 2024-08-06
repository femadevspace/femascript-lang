import { generateDts } from "./generate-dts";
import { generateHighlightCode } from "./generate-highlight-grammar";
import { generateLanguageSettings } from "./generate-language-settings";

await Promise.all([
  Bun.write("./src/types/cst.d.ts", generateDts()),
  Bun.write("./extension/language-settings.json", generateLanguageSettings()),
  Bun.write(
    "./extension/highlight/femascript-grammar.tmLanguage.json",
    await generateHighlightCode()
  ),
]);
