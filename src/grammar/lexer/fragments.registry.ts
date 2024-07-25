import { build, type Pattern } from "xregexp";

export class FragmentsRegistry {
  static #instance: FragmentsRegistry;
  private fragments: Record<string, Pattern> = {};

  public static get instance(): FragmentsRegistry {
    if (!FragmentsRegistry.#instance) {
      FragmentsRegistry.#instance = new FragmentsRegistry();
    }

    return FragmentsRegistry.#instance;
  }

  public add(name: string, def: string) {
    this.fragments[name] = build(def, this.fragments);
  }

  public makePattern(def: string, flags?: string) {
    return build(def, this.fragments, flags);
  }

  public async loadAllFragments() {
    await import("./fragments");
  }
}

const fragmentsRegistry = FragmentsRegistry.instance;
const add = FragmentsRegistry.instance.add.bind(FragmentsRegistry.instance);
const makePattern = FragmentsRegistry.instance.makePattern.bind(
  FragmentsRegistry.instance
);

export { add, fragmentsRegistry, makePattern };
