import { isAllman, isCompact, isKR, RULE } from "../../utils/rules";

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
