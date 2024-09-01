import { LANGUAGE_ID } from "@/utils/globals";
import {
  Diagnostic,
  DiagnosticSeverity,
  Disposable,
  languages,
  Position,
  Range,
  TextDocument,
} from "vscode";

const diagnosticCollection = languages.createDiagnosticCollection(LANGUAGE_ID);

export interface RawDiagnostic extends Omit<Diagnostic, "range" | "severity"> {
  message: string;
  startLine: number;
  startChar: number;
  endLine: number;
  endChar: number;
  severity?: DiagnosticSeverity;
}

export function createDiagnosis(
  document: TextDocument,
  diagnostics: RawDiagnostic[]
) {
  const formattedDiagnostics: Diagnostic[] = diagnostics.map((diagnostic) => {
    let { startLine, startChar, endLine, endChar, severity, ...rest } =
      diagnostic;
    severity ??= DiagnosticSeverity.Error;

    const range = assertRange(startLine, startChar, endLine, endChar);

    return { ...rest, severity, range } satisfies Diagnostic;
  });

  diagnosticCollection.set(document.uri, formattedDiagnostics);
}

/**
 * Convert to 0-based index
 * assert that the range is valid
 * and return a Range object
 */
function assertRange(
  startLine: number,
  startChar: number,
  endLine: number,
  endChar: number
) {
  startLine--;
  startChar--;
  endLine--;
  endChar--;

  if (
    startLine < 0 ||
    startChar < 0 ||
    endLine < 0 ||
    endChar < 0 ||
    startChar >= endChar ||
    startLine > endLine
  )
    throw new Error("Invalid range");

  return new Range(
    new Position(startLine, startChar),
    new Position(endLine, endChar)
  );
}

export function clearDiagnostics() {
  diagnosticCollection.clear();
}

export function register(): Disposable {
  return diagnosticCollection;
}

export function disposeDiagnosticCollection() {
  diagnosticCollection.dispose();
}
