import { VisitedNode } from "../formatter";
import { Settings } from "../settings";
import { IndentationState } from "./indentations";

export type RuleResult = string | null;

export type Rule = (
  options: Settings,
  params: {
    indentState: IndentationState;
  }
) => RuleResult;

export const RULE = (rule: Rule) => rule;

export const isKR = ({ style }: Settings) => style === "k&r";
export const isAllman = ({ style }: Settings) => style === "allman";
export const isCompact = ({ style }: Settings) => style === "compact";

export const when = (condition: boolean, apply: RuleResult) =>
  condition ? apply : null;
export const whenKR = (apply: RuleResult, opts: Settings) =>
  when(isKR(opts), apply);
export const whenAllman = (apply: RuleResult, opts: Settings) =>
  when(isAllman(opts), apply);
export const whenCompact = (apply: RuleResult, opts: Settings) =>
  when(isCompact(opts), apply);

export const separateWith = (
  separator: VisitedNode[number],
  rules: VisitedNode
) =>
  rules
    .flatMap((node) => (node.length === 0 ? [] : [node, separator]))
    .slice(0, -1);

export const beforeEach = (rules: VisitedNode, apply: VisitedNode[number]) =>
  rules.flatMap((node) => (node === null ? [] : [[apply, node]]));
