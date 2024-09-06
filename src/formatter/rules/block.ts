import type { BlockCstNode, StatementCstNode } from "@/types/cst";
import { imageFrom } from "@/utils";
import { IToken } from "chevrotain";
import type { FemaScriptFormatterVisitor, VisitedNode } from "../formatter";
import { BRK_ALLMAN, BRK_KR, BRK_LN, F_BRK_COMPACT } from "./breaklines";
import {
  D_INDT_ALLMAN,
  D_INDT_COMPACT,
  D_INDT_KR,
  I_INDT_ALLMAN,
  I_INDT_COMPACT,
  I_INDT_KR,
  POP_ALIGN_COMPACT,
  PUSH_ALIGN_COMPACT,
} from "./indentation";
import { NONE, WS, WS_ALLMAN, WS_COMPACT, WS_KR } from "./whitespaces";

export const BLOCK = (
  leftCurly: IToken[],
  content: VisitedNode,
  rightCurly: IToken[]
): VisitedNode => [
  [
    [BRK_ALLMAN, PUSH_ALIGN_COMPACT],
    imageFrom(leftCurly),
    [WS_COMPACT, PUSH_ALIGN_COMPACT],
    [I_INDT_KR, BRK_KR],
    [I_INDT_ALLMAN, BRK_ALLMAN],
  ],
  content,
  [
    [POP_ALIGN_COMPACT],
    [D_INDT_KR, D_INDT_ALLMAN],
    [BRK_LN],
    imageFrom(rightCurly),
    [POP_ALIGN_COMPACT],
  ],
];

/**
 * Used for the `case` and `default` keyword
 * in a `switch` statement.
 */
export const CASE = (
  doToken: IToken[],
  colonToken: IToken[] | undefined,
  blockNode: BlockCstNode[] | undefined,
  statementNode: StatementCstNode[] | undefined,
  visitor: FemaScriptFormatterVisitor
): VisitedNode => {
  const isAssignmentStatement =
    !!statementNode?.at(0)?.children.assignmentStatement;

  const behaviorAfterColon = isAssignmentStatement
    ? [WS]
    : [BRK_KR, BRK_ALLMAN, [WS_COMPACT, PUSH_ALIGN_COMPACT]];

  const behaviorAfterStatement = isAssignmentStatement
    ? NONE
    : POP_ALIGN_COMPACT;

  const withColon = [
    imageFrom(colonToken),
    behaviorAfterColon,
    visitor.visit(statementNode),
    behaviorAfterStatement,
  ];

  const withBlock = [WS_KR, WS_COMPACT, visitor.visit(blockNode)];

  const content = statementNode ? withColon : withBlock;

  return [
    [WS_KR, WS_ALLMAN],
    [I_INDT_COMPACT, F_BRK_COMPACT],
    imageFrom(doToken),
    content,
    [D_INDT_COMPACT],
  ];
};
