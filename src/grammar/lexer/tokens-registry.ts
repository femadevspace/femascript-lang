import { createToken, type ITokenConfig, type TokenType } from "chevrotain";
import {
  handleTextmateScope,
  type MaybeTextmateScoped,
} from "../../utils/textmate";

export type Token = TokenType & MaybeTextmateScoped;
export type TokenConfig = ITokenConfig & MaybeTextmateScoped;

const tokensRegistry = new Set<Token>();

const registerToken = (token: Token) => {
  tokensRegistry.add(token);
  return token;
};

const createAndRegisterToken = (tokenConfig: TokenConfig) =>
  registerToken({
    ...createToken(tokenConfig),
    ...handleTextmateScope(tokenConfig),
  });

const getTokens = () => tokensRegistry.values();

export { createAndRegisterToken, getTokens, registerToken };
