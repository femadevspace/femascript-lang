import { indent } from "../../utils/indentations";
import { RULE, whenAllman, whenCompact, whenKR } from "../../utils/rules";

export const INDT = RULE((opts, indtState) => indent(opts, indtState));

export const INDT_KR = RULE((opts, indtState) =>
  whenKR(indent(opts, indtState), opts)
);

export const INDT_ALLMAN = RULE((opts, indtState) =>
  whenAllman(indent(opts, indtState), opts)
);

export const INDT_COMPACT = RULE((opts, indtState) =>
  whenCompact(indent(opts, indtState), opts)
);
