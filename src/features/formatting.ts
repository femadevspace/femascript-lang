import { format, type FormattingStyle, withDefaults } from "@/formatter";
import { LANGUAGE_ID, LANGUAGE_SELECTOR } from "@/utils/globals";
import { hasError } from "@/utils/safe";
import {
  CancellationToken,
  Disposable,
  DocumentFormattingEditProvider,
  DocumentRangeFormattingEditProvider,
  FormattingOptions,
  languages,
  ProviderResult,
  Range,
  TextDocument,
  TextEdit,
  workspace,
} from "vscode";

class FemaScriptDocumentFormattingEditProvider
  implements
    DocumentFormattingEditProvider,
    DocumentRangeFormattingEditProvider
{
  private performFormat(document: TextDocument): ProviderResult<TextEdit[]> {
    const formatterSettings = this.settingsFromExtension();
    const formattedText = format(document.getText(), formatterSettings);

    if (hasError(formattedText)) return;

    const rangeStart = document.lineAt(0).range.start;
    const rangeEnd = document.lineAt(document.lineCount - 1).range.end;
    const fullDocumentRange = new Range(rangeStart, rangeEnd);

    return [TextEdit.replace(fullDocumentRange, formattedText)];
  }

  private settingsFromExtension() {
    const LANG_ID = { languageId: LANGUAGE_ID };
    const editorConfig = workspace.getConfiguration("editor", LANG_ID);
    const languageConfig = workspace.getConfiguration("femascript", LANG_ID);

    const style = languageConfig.get<FormattingStyle>("formatter.style");
    const spaceSize = editorConfig.get<number>("tabSize");
    const useTabs = !editorConfig.get<boolean>("insertSpaces");

    return withDefaults({
      style,
      indentation: {
        spaceSize,
        useTabs,
      },
    });
  }

  provideDocumentRangeFormattingEdits(
    document: TextDocument,
    range: Range,
    options: FormattingOptions,
    token: CancellationToken
  ): ProviderResult<TextEdit[]> {
    return this.performFormat(document);
  }

  provideDocumentFormattingEdits(
    document: TextDocument,
    options: FormattingOptions,
    token: CancellationToken
  ): ProviderResult<TextEdit[]> {
    return this.performFormat(document);
  }
}

export function register(): Disposable {
  const formattingProvider = new FemaScriptDocumentFormattingEditProvider();

  return Disposable.from(
    languages.registerDocumentFormattingEditProvider(
      LANGUAGE_SELECTOR,
      formattingProvider
    ),
    languages.registerDocumentRangeFormattingEditProvider(
      LANGUAGE_SELECTOR,
      formattingProvider
    )
  );
}
