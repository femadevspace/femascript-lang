import { type DeepPartial, mergeDeep } from "@/utils/nested";

export type FormattingStyle = "k&r" | "allman" | "compact";
export type Settings = typeof defaultSettings;

export const defaultSettings = {
  style: "k&r" as FormattingStyle,

  indentation: {
    spaceSize: 4,
    useTabs: false,
    keepBetweenLines: true,
  },
};

export const withDefaults = (settings: DeepPartial<Settings>): Settings =>
  mergeDeep(defaultSettings, settings);
