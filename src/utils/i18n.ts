// TODO: Refactor this to a better "i18n" solution
import type { Production } from "@/grammar";

export const RulesDictionary: Record<Production, string> = {
  algorithm: "Algoritmo",
  header: "Cabeçalho",
  typesDeclarators: "Declaradores de Tipos",
  constantsDeclarators: "Declaradores de Constantes",
  variablesDeclarators: "Declaradores de Variáveis",
  program: "Programa",
  statement: "Declaração",
  assignmentStatement: "Atribuição",
  controlStatements: "Declarações de Blocos de Controle",
  operationsStatements: "Declarações de Operações",
  iterationStatements: "Declarações de Blocos de Iteração",
  doWhileStatement: "Declaração do Bloco 'Faça-Enquanto' (Do-While)",
  whileDoStatement: "Declaração do Bloco 'Enquanto-Faça' (While-Do)",
  forLoopStatement: "Declaração do Loop 'Para' (For)",
  conditionalStatements: "Declarações de Blocos Condicionais",
  ifStatement: "Declaração do Bloco Condicional 'SE' (If)",
  elseStatement: "Declaração do Bloco 'SENÃO' (Else)",
  switchStatement: "Declaração do Bloco 'Avalie' (Switch)",
  caseStatement: "Declaração do Bloco 'Quando' (Case)",
  defaultStatement: "Declaração do Bloco 'CASO_CONTRÁRIO' (Default)",
  expression: "Expressão",
  ternaryExpression: "Expressão Ternária",
  additionExpression: "Expressão de Adição",
  multiplicationExpression: "Expressão de Multiplicação",
  logicalExpression: "Expressão Lógica/Booleana",
  relationalExpression: "Expressão Relacional",
  unaryExpression: "Expressão Unária",
  parenthesisExpression: "Expressão entre Parênteses",
  assignmentExpression: "Expressão de Atribuição",
  printExpression: "Expressão de Impressão",
  readExpression: "Expressão de Leitura",
  variableDeclarator: "Declarador de Variável",
  variableAccess: "Acesso à Variável",
  typeDeclarator: "Declarador de Tipo",
  enumeratorDeclarator: "Declarador de Enumerador",
  enumaratorEntry: "Entrada de Enumerador",
  arrayAccessSuffix: "Sufixo de Acesso a Array",
  arrayAccess: "Acesso a Array",
  block: "Bloco",
};

export const getRuleName = (ruleName: string) =>
  ruleName in RulesDictionary
    ? RulesDictionary[ruleName as Production]
    : ruleName;
