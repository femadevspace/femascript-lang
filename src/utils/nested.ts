export type NestedArray<T> = T | NestedArray<T>[];

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export const mergeDeep = <T>(target: T, source: DeepPartial<T>): T => {
  const output = { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const value = source[key];

      if (value && typeof value === "object" && !Array.isArray(value)) {
        if (!output[key]) (output[key] as any) = {};
        output[key] = mergeDeep(output[key], value);
      } else (output[key] as any) = value;
    }
  }

  return output;
};
