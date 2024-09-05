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

export const indent = (options: Settings, state: IndentationState) => {
  const { useTabs, spaceSize } = options.indentation;
  const char = useTabs ? "\t" : " ";
  const size = useTabs ? 1 : spaceSize;

  return char.repeat(state.getLevel() * size);
};
