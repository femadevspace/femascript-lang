import { format } from "@/formatter";
import { describe, expect, it } from "vitest";
import { forEachStyle, loadFixture } from "../helpers";

const fixture = (fileName: string) =>
  loadFixture(`format/all-productions/${fileName}`);

describe("Format all productions", () => {
  const schema = fixture("schema.alg");

  forEachStyle(({ styleName, style, fileName }) => {
    it(`should pass with ${styleName}`, () => {
      const expected = fixture(fileName);
      const formated = format(schema, { style });

      expect(formated).equal(expected);
    });
  });
});
