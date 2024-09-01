import * as features from "@/features";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  Object.values(features).forEach((feature) =>
    context.subscriptions.push(feature.register())
  );
}

export function deactivate() {
  features.diagnostics.disposeDiagnosticCollection();
}
