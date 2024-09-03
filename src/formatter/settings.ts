import { type DeepPartial } from "@/utils/nested";
import { z } from "zod";

export type Settings = z.infer<typeof settingsSchema>;
export type FormattingStyle = Settings["style"];

export const settingsSchema = z.object({
  style: z.enum(["k&r", "allman", "compact"]).catch("k&r"),

  indentation: z
    .object({
      spaceSize: z.number().min(1).catch(4),
      useTabs: z.boolean().catch(true),
      keepBetweenLines: z.boolean().catch(true),
    })
    .default({}),
});

export const withDefaults = (settings: DeepPartial<Settings>): Settings =>
  settingsSchema.parse(settings);
