import { FemaScriptLanguageParser } from "@/grammar/parser";
import { generateCstDts, type Rule } from "chevrotain";

const parser = new FemaScriptLanguageParser();

const generateCstNodeTypes = () =>
  parser
    .getSerializedGastProductions()
    .map((production) => {
      if (production.type !== "Rule") return;
      const { name: ruleName } = production as unknown as Rule;

      const nodeName = ruleName[0].toUpperCase() + ruleName.slice(1);

      return `  ${ruleName}: ${nodeName}CstNode;`;
    })
    .filter(String)
    .join("\n");

const typesDefinitionFileContent = `/**
 * * This file was generated by the script generate-dts.ts;
 *
 * ! DO NOT MODIFY IT MANUALLY, ALL CHANGES WILL BE OVERWRITTEN !
 */

${generateCstDts(parser.getGAstProductions())}
export type CstNodeTypes = {
${generateCstNodeTypes()}
};
`;

Bun.write("./src/types/cst.d.ts", typesDefinitionFileContent);