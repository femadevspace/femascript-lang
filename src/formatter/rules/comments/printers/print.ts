import type { VisitedNode } from "@/formatter/formatter";
import type { CstElementWithComments } from "@/utils/comments";
import { mapLeadingComments, mapTrailingComments } from "../mappers";

export const printWithComments = (
  element: CstElementWithComments,
  visitedNode: VisitedNode
): VisitedNode => [
  mapLeadingComments(element),
  visitedNode,
  mapTrailingComments(element),
];
