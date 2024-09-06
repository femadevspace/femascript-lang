import { format } from "@/formatter";
import { describe, expect, it } from "vitest";
import { loadFixture } from "../helpers";

const fixture = (fileName: string) =>
  loadFixture(`format/without-comments/${fileName}`);

describe("Format without comments", () => {
  const schema = fixture("schema.alg");

  it("should pass with K&R style", () => {
    const expected = fixture("expected_kr.alg");
    const formated = format(schema, { style: "k&r" });

    expect(formated).equal(expected);
  });

  it("should pass with Allman style", () => {
    const expected = fixture("expected_allman.alg");
    const formated = format(schema, { style: "allman" });

    expect(formated).equal(expected);
  });

  it("should pass with Compact style", () => {
    const expected = fixture("expected_compact.alg");
    const formated = format(schema, { style: "compact" });

    expect(formated).equal(expected);
  });
});
