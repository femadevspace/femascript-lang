import { RULE, whenAllman, whenCompact, whenKR } from "../utils/rules";
import { INDT, INDT_ALLMAN, INDT_COMPACT, INDT_KR } from "./indentation";

const BREAK_LINE_CHAR = "\n";
export const BRK_LN = [BREAK_LINE_CHAR, INDT];

const BRK_WHEN_KR = RULE((opts) => whenKR(BREAK_LINE_CHAR, opts));
const BRK_WHEN_ALLMAN = RULE((opts) => whenAllman(BREAK_LINE_CHAR, opts));
const BRK_WHEN_COMPACT = RULE((opts) => whenCompact(BREAK_LINE_CHAR, opts));

export const BRK_KR = [BRK_WHEN_KR, INDT_KR];
export const BRK_ALLMAN = [BRK_WHEN_ALLMAN, INDT_ALLMAN];
export const BRK_COMPACT = [BRK_WHEN_COMPACT, INDT_COMPACT];

const SKIP_LINE_CHAR = "\n\n";
export const SKIP_LN = [SKIP_LINE_CHAR, INDT];

const SKIP_WHEN_KR = RULE((opts) => whenKR(SKIP_LINE_CHAR, opts));
const SKIP_WHEN_ALLMAN = RULE((opts) => whenAllman(SKIP_LINE_CHAR, opts));
const SKIP_WHEN_COMPACT = RULE((opts) => whenCompact(SKIP_LINE_CHAR, opts));

export const SKIP_KR = [SKIP_WHEN_KR, BRK_KR];
export const SKIP_ALLMAN = [SKIP_WHEN_ALLMAN, BRK_ALLMAN];
export const SKIP_COMPACT = [SKIP_WHEN_COMPACT, BRK_COMPACT];
