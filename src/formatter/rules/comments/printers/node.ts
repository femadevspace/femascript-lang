import type { VisitedNode } from "@/formatter/formatter";
import type { CstNodeWithComments } from "@/utils/comments";
import { printWithComments } from "./print";

export const printNodeWithComments = (
  node: CstNodeWithComments,
  visitedNode: VisitedNode
): VisitedNode => printWithComments(node, visitedNode);
