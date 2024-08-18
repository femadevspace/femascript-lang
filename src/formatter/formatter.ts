import { BaseVisitor } from "@/grammar";
import type { NestedArray } from "@/utils/nested";
import type { CstNode } from "chevrotain";
import { Settings } from "./settings";
import type { Rule } from "./utils/rules";

export type VisitedNode = NestedArray<string | Rule>[];

export class FemaScriptFormatterVisitor extends BaseVisitor {
  constructor(private settings: Settings) {
    super();
    this.validateVisitor();
  }

  override visit(node: undefined | CstNode | CstNode[]): VisitedNode {
    if (!node) return [];

    if (Array.isArray(node)) return node.map((n) => this.visit(n));
    const nodeName = node.name as keyof FemaScriptFormatterVisitor;
    const nodeChildren = node.children as any;

    return this[nodeName](nodeChildren) as VisitedNode;
  }
}
