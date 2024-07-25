import { createToken, type ITokenConfig, type TokenType } from "chevrotain";

type TextmateScopedToken =
  | {
      textmateScope: string;
    }
  | {
      skipTextmateScope: true;
    };

type Token = TokenType & TextmateScopedToken;

export class TokensRegistry {
  static #instance: TokensRegistry;
  private tokens: Array<Token> = [];

  public static get instance(): TokensRegistry {
    if (!TokensRegistry.#instance) {
      TokensRegistry.#instance = new TokensRegistry();
    }

    return TokensRegistry.#instance;
  }

  public add(tokenConfig: ITokenConfig & TextmateScopedToken) {
    let createdToken: Token;
    if ("skipTextmateScope" in tokenConfig)
      createdToken = {
        ...createToken(tokenConfig),
        skipTextmateScope: true,
      };
    else
      createdToken = {
        ...createToken(tokenConfig),
        textmateScope: tokenConfig.textmateScope,
      };

    this.tokens.push(createdToken);
    return createdToken;
  }

  public getAllTokens(): Array<Token> {
    return this.tokens;
  }
}

const tokensRegistry = TokensRegistry.instance;
const add = tokensRegistry.add.bind(tokensRegistry);
const getAllTokens = tokensRegistry.getAllTokens.bind(tokensRegistry);

export { add, getAllTokens, tokensRegistry };
