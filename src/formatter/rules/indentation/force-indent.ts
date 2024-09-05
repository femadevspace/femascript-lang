import { indent } from "../../utils/indentations";
import { RULE, whenAllman, whenCompact, whenKR } from "../../utils/rules";

export const F_INDT = RULE((opts, indtState) => indent(opts, indtState));

export const F_INDT_KR = RULE((opts, indtState) =>
  whenKR(indent(opts, indtState, true), opts)
);

export const F_INDT_ALLMAN = RULE((opts, indtState) =>
  whenAllman(indent(opts, indtState, true), opts)
);

export const F_INDT_COMPACT = RULE((opts, indtState) =>
  whenCompact(indent(opts, indtState, true), opts)
);
