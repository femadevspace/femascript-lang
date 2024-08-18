import { RULE, whenAllman, whenCompact, whenKR } from "../utils/rules";

export const NONE = "";
export const WS = " ";

export const WS_KR = RULE((opts) => whenKR(WS, opts));
export const WS_ALLMAN = RULE((opts) => whenAllman(WS, opts));
export const WS_COMPACT = RULE((opts) => whenCompact(WS, opts));
