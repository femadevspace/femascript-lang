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
export const whenKR = (apply: RuleResult, { style }: Settings) =>
  when(style === "k&n", apply);
export const whenAllman = (apply: RuleResult, { style }: Settings) =>
  when(style === "allman", apply);
export const whenCompact = (apply: RuleResult, { style }: Settings) =>
  when(style === "compact", apply);
