import { getTokens } from "../../src/grammar";
import type { TextmatePattern, WithTextmateScope } from "../../src/utils";

type Repository = {
  patterns: TextmatePattern[];
};

export const generateHighlightCode = async () => {
  let repository: Record<string, Repository> = {};
  const extractRepository = (scope: WithTextmateScope["textmateScope"]) =>
    typeof scope === "string"
      ? scope.split(".")[0]
      : scope.repository || scope.name.split(".")[0];

  const appendLanguageSuffix = (pattern: TextmatePattern) => {
    if (pattern.name) pattern.name += ".femascript";

    if (pattern.patterns)
      for (const subPattern of pattern.patterns)
        appendLanguageSuffix(subPattern);
  };

  getTokens().forEach((token) => {
    if ("skipTextmateScope" in token) return;

    const { textmateScope, PATTERN } = token;
    const repositoryName = extractRepository(textmateScope);
    const match = (PATTERN as RegExp).source;
    let pattern: TextmatePattern;

    if (typeof textmateScope === "string")
      pattern = { name: textmateScope, match };
    else pattern = textmateScope;

    appendLanguageSuffix(pattern);

    if (repositoryName in repository)
      repository[repositoryName] = {
        patterns: [...repository[repositoryName].patterns, pattern],
      };
    else
      repository[repositoryName] = {
        patterns: [pattern],
      };
  });

  const patterns = Object.keys(repository).map((key) => ({
    include: `#${key}`,
  }));

  const result = {
    $schema:
      "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
    name: "FemaScript",
    scopeName: "source.femascript",
    patterns,
    repository,
  };

  return JSON.stringify(result, null, 2);
};
