import "@/grammar/lexer";
import { Lexer, TokenType } from "chevrotain";
import { getTokens } from "../../src/grammar/lexer";
import * as tokensWithVariableNames from "../../src/grammar/lexer/tokens";

const PARSER_STARTS_ON = "class FemaScriptLanguageParser extends CstParser {";

const generatePlaygroundCode = async () => {
  const categoriesNames = Array.from(
    new Set(
      Object.values(tokensWithVariableNames)
        .map(({ CATEGORIES }) =>
          CATEGORIES && CATEGORIES.length > 0
            ? CATEGORIES.map(({ name }) => name)
            : undefined
        )
        .filter((_) => !!_)
        .flat()
    )
  );

  const tokensSequence = new Set<string>();
  categoriesNames.forEach((_) => tokensSequence.add(_));

  getTokens().forEach(({ name, PATTERN }) => {
    const variableName = Object.entries(tokensWithVariableNames).find(
      ([_, comparisonToken]) =>
        comparisonToken.name === name || comparisonToken.PATTERN === PATTERN
    )?.[0];

    if (!variableName) throw new Error(`Token ${name} not found.`);

    tokensSequence.add(variableName);
  });

  const tokensDefinitions = Array.from(tokensSequence)
    .sort((a, b) =>
      // Always put BinaryOperator at the beginning
      a === "BinaryOperator" ? -1 : b === "BinaryOperator" ? 1 : 0
    )
    .map((_) => {
      const tokenVariableName = _ as keyof typeof tokensWithVariableNames;
      const { name, PATTERN, LABEL, CATEGORIES, GROUP } =
        tokensWithVariableNames[tokenVariableName] as TokenType;

      const solvedCategories = (
        CATEGORIES ? CATEGORIES.map(({ name }) => name) : ([] as string[])
      ).join(", ");
      let result = `const ${tokenVariableName} = createToken({name: "${name}"`;

      if ((PATTERN as RegExp).source === /NOT_APPLICABLE/.source)
        result += ", pattern: Lexer.NA";
      else result += `, pattern: ${PATTERN}`;
      if (LABEL) result += `, label: "${LABEL}"`;
      if (solvedCategories.length > 0)
        result += `, categories: [${solvedCategories}]`;

      if (GROUP)
        result += `, group: ${
          GROUP.includes(Lexer.SKIPPED) ? `Lexer.SKIPPED` : `'${String(GROUP)}'`
        }`;

      result += "});";

      return result;
    });

  Object.entries(tokensWithVariableNames).sort(([a], [b]) => {
    const aIsCategory = categoriesNames.includes(a);
    const bIsCategory = categoriesNames.includes(b);
    const isPriority = (_: string) =>
      _ === "BinaryOperator" || _ !== "Identifier";

    if (isPriority(a)) return -1;
    if (isPriority(b)) return 1;

    if (aIsCategory && bIsCategory)
      return categoriesNames.indexOf(a) - categoriesNames.indexOf(b);
    if (aIsCategory) return -1;
    if (bIsCategory) return 1;
    return a.localeCompare(b);
  });

  const rawParserText = await Bun.file("./src/grammar/parser/parser.ts").text();
  const parser = rawParserText
    .substring(rawParserText.indexOf(PARSER_STARTS_ON))
    .replaceAll("lexer.", "")
    .replaceAll("getTokens()", "allTokens");

  return `
(function example() {
  // ----------------- Lexer -----------------
  const Lexer = chevrotain.Lexer;

  const allTokens = []

  const createToken = (config) => {
    const newToken = chevrotain.createToken(config);
    allTokens.push(newToken);
    return newToken;
  };

  ${tokensDefinitions.join("\n  ")}

  const FemaScriptLexer = new Lexer(allTokens, {
    positionTracking: "onlyStart",
  });

  // ----------------- parser -----------------
  const CstParser = chevrotain.CstParser;

  ${parser}

  // for the playground to work the returned object must contain these fields
  return {
    lexer: FemaScriptLexer,
    parser: FemaScriptLanguageParser,
    defaultRule: "algorithm",
  };
})();`;
};

await Bun.write("./dist/playground.ts", await generatePlaygroundCode());
