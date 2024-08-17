import { Settings } from "../settings";

export type IndentationState = {
  getLevel(): number;
  increase(): void;
  decrease(): void;
};

export const createIndentationState = () => {
  let level = 0;

  return {
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
