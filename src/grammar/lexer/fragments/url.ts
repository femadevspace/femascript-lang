import { add as FRAGMENT } from "../fragments.registry";

FRAGMENT("url", "([!#\\$%&*-~]|{{nonascii}}|{{escape}})*");
