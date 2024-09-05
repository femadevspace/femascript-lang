import { indent } from "../../utils/indentations";
import { RULE, whenAllman, whenCompact, whenKR } from "../../utils/rules";

export const INDT = RULE((opts, { indentState }) => indent(opts, indentState));

export const INDT_KR = RULE((opts, { indentState }) =>
  whenKR(indent(opts, indentState), opts)
);

export const INDT_ALLMAN = RULE((opts, { indentState }) =>
  whenAllman(indent(opts, indentState), opts)
);

export const INDT_COMPACT = RULE((opts, { indentState }) =>
  whenCompact(indent(opts, indentState), opts)
);
