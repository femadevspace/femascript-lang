import { Stack } from "@/utils/stack";
import { Settings } from "../settings";

export type IndentationState = {
  getFixedAmountStack(): Stack<number>;
  getLevel(): number;
  increase(): void;
  decrease(): void;
};

export const createIndentationState = (): IndentationState => {
  let level = 0;
  const fixedAmountStack = new Stack<number>();

  return {
    getFixedAmountStack() {
      return fixedAmountStack;
    },
    getLevel() {
      return level;
    },
    increase() {
      level++;
    },
    decrease() {
      level--;
    },
  };
};

export const indent = (
  options: Settings,
  state: IndentationState,
  forceOneIndent = false
) => {
  const { useTabs, spaceSize } = options.indentation;
  const char = useTabs ? "\t" : " ";
  const size = useTabs ? 1 : spaceSize;
  const indentAmount = state.getLevel() * size;
  const fixedAmount = state.getFixedAmountStack().peek();
  let amount = fixedAmount ? fixedAmount : indentAmount;

  if (forceOneIndent) amount += size;

  return char.repeat(amount);
};
