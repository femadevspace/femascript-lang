import fs from "fs";
import path from "path";

export const loadFixture = (filePath: string) =>
  fs.readFileSync(path.resolve(__dirname, "../fixtures/", filePath), "utf-8");
