import { FormattingStyle } from "@/formatter";
import fs from "fs";
import path from "path";

export const loadFixture = (filePath: string) =>
  fs.readFileSync(path.resolve(__dirname, "fixtures/", filePath), "utf-8");

type CallbackParams = {
  styleName: string;
  style: FormattingStyle;
  fileName: string;
};

export const forEachStyle = (callback: (params: CallbackParams) => void) =>
  (["K&R", "Allman", "Compact"] as const).forEach((style) =>
    callback({
      styleName: style.concat(" style"),
      style: style.toLowerCase() as FormattingStyle,
      fileName: `expected_${style.toLowerCase().replace("&", "")}.alg`,
    })
  );
