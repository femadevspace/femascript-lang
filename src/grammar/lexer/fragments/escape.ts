import { add as FRAGMENT } from "../fragments.registry";

FRAGMENT("escape", "{{unicode}}|\\\\[^\\r\\n\\f0-9a-f]");
