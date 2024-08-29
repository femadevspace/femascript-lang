export type Safe<Data extends object, Error> = Data | { error: Error };

export const hasError = <Data extends object, Error>(
  value: Safe<Data, Error>
): value is { error: Error } => "error" in value;
