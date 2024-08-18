import { RULE, whenAllman, whenCompact, whenKR } from "../utils/rules";

export const BRK_LN = "\n";

export const BRK_KR = RULE((opts) => whenKR(BRK_LN, opts));
export const BRK_ALLMAN = RULE((opts) => whenAllman(BRK_LN, opts));
export const BRK_COMPACT = RULE((opts) => whenCompact(BRK_LN, opts));

export const SKIP_LN = "\n\n";

export const SKIP_KR = RULE((opts) => whenKR(SKIP_LN, opts));
export const SKIP_ALLMAN = RULE((opts) => whenAllman(SKIP_LN, opts));
export const SKIP_COMPACT = RULE((opts) => whenCompact(SKIP_LN, opts));
