import { createLogger } from "@monorepo-chatapp/common";
import type { Logger } from "@monorepo-chatapp/common";

export const logger: Logger = createLogger({ name: "auth-service" });
