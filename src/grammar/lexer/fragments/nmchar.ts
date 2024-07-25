import { add as FRAGMENT } from "../fragments.registry";

FRAGMENT("nmchar", "[_a-zA-Z0-9-]|{{nonascii}}|{{escape}}");
