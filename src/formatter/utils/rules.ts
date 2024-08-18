import { Settings } from "../settings";
import { IndentationState } from "./indentations";

export type RuleResult = string | null;

export type Rule = (
  options: Settings,
  indentState: IndentationState
) => RuleResult;

export const RULE = (rule: Rule) => rule;

export const when = (condition: boolean, apply: RuleResult) =>
  condition ? apply : null;

export const isKR = ({ style }: Settings) => style === "k&r";
export const isAllman = ({ style }: Settings) => style === "allman";
export const isCompact = ({ style }: Settings) => style === "compact";

export const whenKR = (apply: RuleResult, opts: Settings) =>
  when(isKR(opts), apply);
export const whenAllman = (apply: RuleResult, opts: Settings) =>
  when(isAllman(opts), apply);
export const whenCompact = (apply: RuleResult, opts: Settings) =>
  when(isCompact(opts), apply);
