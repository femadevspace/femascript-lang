import { isAllman, isCompact, isKR, RULE } from "../../utils/rules";

export const I_INDT = RULE((opts, { indentState }) => {
  indentState.increase();
  return null;
});

export const I_INDT_KR = RULE((opts, { indentState }) => {
  if (isKR(opts)) indentState.increase();
  return null;
});

export const I_INDT_ALLMAN = RULE((opts, { indentState }) => {
  if (isAllman(opts)) indentState.increase();
  return null;
});

export const I_INDT_COMPACT = RULE((opts, { indentState }) => {
  if (isCompact(opts)) indentState.increase();
  return null;
});
