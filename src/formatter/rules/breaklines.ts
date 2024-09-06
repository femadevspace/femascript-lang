import { RULE, whenAllman, whenCompact, whenKR } from "../utils/rules";
import {
  F_INDT,
  F_INDT_ALLMAN,
  F_INDT_COMPACT,
  F_INDT_KR,
  INDT,
  INDT_ALLMAN,
  INDT_COMPACT,
  INDT_KR,
} from "./indentation";

const BREAK_LINE_CHAR = "\n";
export const BRK_LN = [BREAK_LINE_CHAR, INDT];
export const F_BRK_LN = [BREAK_LINE_CHAR, F_INDT];

const BRK_WHEN_KR = RULE((opts) => whenKR(BREAK_LINE_CHAR, opts));
const BRK_WHEN_ALLMAN = RULE((opts) => whenAllman(BREAK_LINE_CHAR, opts));
const BRK_WHEN_COMPACT = RULE((opts) => whenCompact(BREAK_LINE_CHAR, opts));

export const BRK_KR = [BRK_WHEN_KR, INDT_KR];
export const BRK_ALLMAN = [BRK_WHEN_ALLMAN, INDT_ALLMAN];
export const BRK_COMPACT = [BRK_WHEN_COMPACT, INDT_COMPACT];

export const F_BRK_KR = [BRK_WHEN_KR, F_INDT_KR];
export const F_BRK_ALLMAN = [BRK_WHEN_ALLMAN, F_INDT_ALLMAN];
export const F_BRK_COMPACT = [BRK_WHEN_COMPACT, F_INDT_COMPACT];

const SKIP_RULE = RULE((opts, params) =>
  opts.indentation.keepBetweenLines ? `\n${INDT(opts, params)}\n` : "\n\n"
);

export const SKIP_LN = [SKIP_RULE, INDT];

const SKIP_WHEN_KR = RULE((opts, params) =>
  whenKR(SKIP_RULE(opts, params), opts)
);
const SKIP_WHEN_ALLMAN = RULE((opts, params) =>
  whenAllman(SKIP_RULE(opts, params), opts)
);
const SKIP_WHEN_COMPACT = RULE((opts, params) =>
  whenCompact(SKIP_RULE(opts, params), opts)
);

export const SKIP_KR = [SKIP_WHEN_KR, INDT_KR];
export const SKIP_ALLMAN = [SKIP_WHEN_ALLMAN, INDT_ALLMAN];
export const SKIP_COMPACT = [SKIP_WHEN_COMPACT, INDT_COMPACT];
