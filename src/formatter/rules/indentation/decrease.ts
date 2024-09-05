import { isAllman, isCompact, isKR, RULE } from "../../utils/rules";

export const D_INDT = RULE((opts, { indentState }) => {
  indentState.decrease();
  return null;
});

export const D_INDT_KR = RULE((opts, { indentState }) => {
  if (isKR(opts)) indentState.decrease();
  return null;
});

export const D_INDT_ALLMAN = RULE((opts, { indentState }) => {
  if (isAllman(opts)) indentState.decrease();
  return null;
});

export const D_INDT_COMPACT = RULE((opts, { indentState }) => {
  if (isCompact(opts)) indentState.decrease();
  return null;
});
