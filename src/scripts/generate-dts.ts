import { AlgoritmoLanguageParser } from "@/grammar/parser";
import { generateCstDts } from "chevrotain";

const typesDefenitionsFileContent = `/**
 * * This file was generated by the script generate-dts.ts;
 *
 * ! DO NOT MODIFY IT MANUALLY, ALL CHANGES WILL BE OVERWRITTEN !
 */

${generateCstDts(new AlgoritmoLanguageParser().getGAstProductions())}
export type ParserEntryPoint = Exclude<
  keyof ICstNodeVisitor<never, never>,
  keyof ICstVisitor<never, never>
>;
`;

Bun.write("./src/types/cst.d.ts", typesDefenitionsFileContent);
