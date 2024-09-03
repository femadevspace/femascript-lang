import { format, type FormattingStyle, withDefaults } from "@/formatter";
import { LANGUAGE_SELECTOR } from "@/utils/globals";
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
  private performFormat(
    document: TextDocument,
    options: FormattingOptions
  ): ProviderResult<TextEdit[]> {
    const formattedText = format(
      document.getText(),
      this.settingsFromExtension(options)
    );

    if (hasError(formattedText)) return;

    const rangeStart = document.lineAt(0).range.start;
    const rangeEnd = document.lineAt(document.lineCount - 1).range.end;
    const fullDocumentRange = new Range(rangeStart, rangeEnd);

    return [TextEdit.replace(fullDocumentRange, formattedText)];
  }

  private settingsFromExtension(options: FormattingOptions) {
    const config = workspace.getConfiguration("femascript");
    const style = config.get<FormattingStyle>("formatter.style");

    return withDefaults({
      style,
      indentation: {
        spaceSize: options.tabSize,
        useTabs: !options.insertSpaces,
      },
    });
  }

  provideDocumentRangeFormattingEdits(
    document: TextDocument,
    range: Range,
    options: FormattingOptions,
    token: CancellationToken
  ): ProviderResult<TextEdit[]> {
    return this.performFormat(document, options);
  }

  provideDocumentFormattingEdits(
    document: TextDocument,
    options: FormattingOptions,
    token: CancellationToken
  ): ProviderResult<TextEdit[]> {
    return this.performFormat(document, options);
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
