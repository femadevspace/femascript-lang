export type Safe<Data, Error> = Data | { error: Error };

export const hasError = <Data, Error>(
  value: Safe<Data, Error>
): value is { error: Error } =>
  value && typeof value === "object" && "error" in value;
