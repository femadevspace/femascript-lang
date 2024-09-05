import { Rule, RULE, whenAllman, whenCompact, whenKR } from "../../utils/rules";

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

export const PUSH_ALIGN_KR = RULE((opts, params) => whenKR(push(params), opts));
export const POP_ALIGN_KR = RULE((opts, params) => whenKR(pop(params), opts));

export const PUSH_ALIGN_ALLMAN = RULE((opts, params) =>
  whenAllman(push(params), opts)
);
export const POP_ALIGN_ALLMAN = RULE((opts, params) =>
  whenAllman(pop(params), opts)
);

export const PUSH_ALIGN_COMPACT = RULE((opts, params) =>
  whenCompact(push(params), opts)
);
export const POP_ALIGN_COMPACT = RULE((opts, params) =>
  whenCompact(pop(params), opts)
);
