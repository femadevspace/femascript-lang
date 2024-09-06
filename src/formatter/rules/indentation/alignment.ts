import { isAllman, isCompact, isKR, Rule, RULE } from "../../utils/rules";

const push = ({ indentState, currentLine }: Parameters<Rule>[1]) => {
  indentState.getFixedAmountStack().push(currentLine.length);
  return null;
};

const pop = ({ indentState }: Parameters<Rule>[1]) => {
  indentState.getFixedAmountStack().pop();
  return null;
};

export const PUSH_ALIGN = RULE((opts, params) => push(params));
export const POP_ALIGN = RULE((opts, params) => pop(params));

export const PUSH_ALIGN_KR = RULE((opts, params) =>
  isKR(opts) ? push(params) : null
);
export const POP_ALIGN_KR = RULE((opts, params) =>
  isKR(opts) ? pop(params) : null
);

export const PUSH_ALIGN_ALLMAN = RULE((opts, params) =>
  isAllman(opts) ? push(params) : null
);
export const POP_ALIGN_ALLMAN = RULE((opts, params) =>
  isAllman(opts) ? pop(params) : null
);

export const PUSH_ALIGN_COMPACT = RULE((opts, params) =>
  isCompact(opts) ? push(params) : null
);
export const POP_ALIGN_COMPACT = RULE((opts, params) =>
  isCompact(opts) ? pop(params) : null
);
