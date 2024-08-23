import type { VisitedNode } from "@/formatter/formatter";
import type { CstElementWithComments } from "@/utils/comments";
import { formatComment } from "../formatters";

export const mapLeadingComments = ({
  leadingComments,
}: CstElementWithComments): VisitedNode =>
  leadingComments ? leadingComments.map(formatComment) : [];
