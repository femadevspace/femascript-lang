import "@/grammar/lexer";
import * as tokensDefinitionsVariableNames from "@/grammar/lexer/tokens";

const PARSER_STARTS_ON = "class AlgoritmoLanguageParser extends CstParser {";

const generatePlaygroundCode = async () => {
  const categoriesNames = Array.from(
    new Set(
      Object.values(tokensDefinitionsVariableNames)
        .map(({ CATEGORIES }) =>
          CATEGORIES && CATEGORIES.length > 0
            ? CATEGORIES.map(({ name }) => name)
            : undefined
        )
        .filter((_) => !!_)
        .flat()
    )
  );

  const tokensDefinitions = Object.entries(tokensDefinitionsVariableNames)
    .sort(([a], [b]) => {
      const aIsCategory = categoriesNames.includes(a);
      const bIsCategory = categoriesNames.includes(b);
      const isPriority = (_: string) => _ === "BinaryOperator";

      if (isPriority(a)) return -1;
      if (isPriority(b)) return 1;

      if (aIsCategory && bIsCategory)
        return categoriesNames.indexOf(a) - categoriesNames.indexOf(b);
      if (aIsCategory) return -1;
      if (bIsCategory) return 1;
      return 0;
    })
    .map(([variableName, { name, PATTERN, LABEL, CATEGORIES, GROUP }]) => {
      const solvedCategories = (
        CATEGORIES ? CATEGORIES.map(({ name }) => name) : ([] as string[])
      ).join(", ");
      let result = `const ${variableName} = createToken({name: "${name}"`;

      if ((PATTERN as RegExp).source === /NOT_APPLICABLE/.source)
        result += ", pattern: Lexer.NA";
      else result += `, pattern: ${PATTERN}`;
      if (LABEL) result += `, label: "${LABEL}"`;
      if (solvedCategories.length > 0)
        result += `, categories: [${solvedCategories}]`;
      if (GROUP) result += `, group: Lexer.SKIPPED`;

      result += "});";

      return result;
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

  const AlgoritmoLexer = new Lexer(allTokens, {
    positionTracking: "onlyStart",
  });

  // ----------------- parser -----------------
  const CstParser = chevrotain.CstParser;

  ${parser}

  // for the playground to work the returned object must contain these fields
  return {
    lexer: AlgoritmoLexer,
    parser: AlgoritmoLanguageParser,
    defaultRule: "algorithm",
  };
})();`;
};

await Bun.write("./dist/playground.ts", await generatePlaygroundCode());
