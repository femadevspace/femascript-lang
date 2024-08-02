import { FemaScriptLanguageParser } from "@/grammar/parser";
import { createSyntaxDiagramsCode, Rule } from "chevrotain";
import { watch } from "fs/promises";

/**
 * ! This script seams to be broken. !
 * It's not generating the diagrams correctly
 * when updating the `parser` file.
 *
 * Although is temporarily serving to facilitate
 * the visualization of the parser in a diagram form.
 */

console.log("Watching for file changes...");

const appendHtml = (raw: string) => {
  const HEAD_START_AFTER = `<!DOCTYPE html>`;
  const HEAD_END_BEFORE = `<div id="diagrams" align="center"></div>`;

  let headContent = "<head>\n";
  headContent += raw.substring(
    raw.indexOf(HEAD_START_AFTER) + HEAD_START_AFTER.length,
    raw.indexOf(HEAD_END_BEFORE)
  );
  headContent += "</head>";

  let bodyContent = "<body>\n";
  bodyContent += raw.substring(raw.indexOf(HEAD_END_BEFORE));
  bodyContent += "</body>";

  let html = [
    "<!-- This is a generated file -->",
    "<!DOCTYPE html>",
    '<html lang="en">',
    headContent,
    bodyContent,
    "</html>",
  ].join("\n");

  return html;
};

const generate = async () => {
  const parser = () => new FemaScriptLanguageParser();
  const productions = parser().getSerializedGastProductions();

  productions.forEach((production) =>
    production.type === "Rule"
      ? console.log((production as unknown as Rule).name)
      : undefined
  );

  const htmlContent = createSyntaxDiagramsCode(productions);

  console.log("Writing diagrams to dist/diagram.html...");

  await Bun.write("./dist/diagram.html", appendHtml(htmlContent));
};
await generate();

const watcher = watch("./src", { recursive: true });

for await (const event of watcher) {
  const { eventType, filename } = event;
  if (eventType !== "change") continue;
  if (filename?.search(/\.ts$/) === -1) continue;

  console.log(`File ${filename} has been changed. Generating diagrams...`);
  await generate();
}

process.on("SIGINT", () => {
  // close watcher when Ctrl-C is pressed
  console.log("\nClosing watcher...");

  process.exit(0);
});
