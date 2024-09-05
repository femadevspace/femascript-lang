import { indent } from "../../utils/indentations";
import { RULE, whenAllman, whenCompact, whenKR } from "../../utils/rules";

export const F_INDT = RULE((opts, { indentState }) =>
  indent(opts, indentState, true)
);

export const F_INDT_KR = RULE((opts, { indentState }) =>
  whenKR(indent(opts, indentState, true), opts)
);

export const F_INDT_ALLMAN = RULE((opts, { indentState }) =>
  whenAllman(indent(opts, indentState, true), opts)
);

export const F_INDT_COMPACT = RULE((opts, { indentState }) =>
  whenCompact(indent(opts, indentState, true), opts)
);
