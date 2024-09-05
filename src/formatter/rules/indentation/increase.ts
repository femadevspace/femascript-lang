import { isAllman, isCompact, isKR, RULE } from "../../utils/rules";

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
