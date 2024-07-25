import { add as FRAGMENT } from "../fragments.registry";

FRAGMENT("blockcomment", "\\/\\*[^*]*\\*+([^/*][^*]*\\*+)*\\/");

FRAGMENT("inlinecomment", "/(//).*({{nl}})*/");
