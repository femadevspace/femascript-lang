import { parse } from "@/grammar";
import { LANGUAGE_ID } from "@/utils/globals";
import { hasError } from "@/utils/safe";
import { Disposable, type TextDocument, workspace } from "vscode";
import { clearDiagnostics, createDiagnosis } from "./diagnostics";

const provideDiagnostics = (document: TextDocument) => {
  if (document.languageId !== LANGUAGE_ID) return;

  const cst = parse(document.getText());

  if (hasError(cst)) createDiagnosis(document, cst.error);
  else clearDiagnostics();
};

export function register(): Disposable {
  return Disposable.from(
    workspace.onDidOpenTextDocument(provideDiagnostics),
    workspace.onDidChangeTextDocument(({ document }) =>
      provideDiagnostics(document)
    )
  );
}
