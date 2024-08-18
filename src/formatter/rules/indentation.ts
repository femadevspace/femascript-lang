import { indent } from "../utils/indentations";
import {
  isAllman,
  isCompact,
  isKR,
  RULE,
  whenAllman,
  whenCompact,
  whenKR,
} from "../utils/rules";

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

export const I_INDT = RULE((opts, indtState) => {
  indtState.increase();
  return null;
});

export const I_INDT_KR = RULE((opts, indtState) => {
  if (isKR(opts)) indtState.increase();
  return null;
});
export const I_INDT_ALLMAN = RULE((opts, indtState) => {
  if (isAllman(opts)) indtState.increase();
  return null;
});
export const I_INDT_COMPACT = RULE((opts, indtState) => {
  if (isCompact(opts)) indtState.increase();
  return null;
});

export const D_INDT = RULE((opts, indtState) => {
  indtState.decrease();
  return null;
});

export const D_INDT_KR = RULE((opts, indtState) => {
  if (isKR(opts)) indtState.decrease();
  return null;
});
export const D_INDT_ALLMAN = RULE((opts, indtState) => {
  if (isAllman(opts)) indtState.decrease();
  return null;
});
export const D_INDT_COMPACT = RULE((opts, indtState) => {
  if (isCompact(opts)) indtState.decrease();
  return null;
});
