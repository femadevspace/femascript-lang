import { createAndRegisterToken as TOKEN } from "../tokens-registry";

export const AssignmentOperator = TOKEN({
  name: "AssignmentOperator",
  pattern: /(<-)/,
  label: "'<-'",
  textmateScope: "keyword.operator.assignment",
});
