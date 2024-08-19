export type FormattingStyle = "k&r" | "allman" | "compact";
export type Settings = typeof defaultSettings;

export const defaultSettings = {
  style: "compact" as FormattingStyle,

  indentation: {
    spaceSize: 4,
    useTabs: false,
    keepBetweenLines: true,
  },
};
