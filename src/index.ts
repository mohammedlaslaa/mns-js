// eslint-disable-next-line @typescript-eslint/no-var-requires
import logger from "./utils/logger";
import launchApp from "./services/launchApp";

import { Application } from "./types/types";
import * as process from "process";

export const apps: Application[] = [];

export const run = () => {
  const AppCompilationStartedAt = Date.now();

  logger.info("Application is starting...");

  launchApp().then(() => {
    const AppCompilationFinishedAt = Date.now();

    logger.info(
      `Application compiled in ${
        AppCompilationFinishedAt - AppCompilationStartedAt
      }ms`
    );
  });
};

if (process.env.MODE === "RUN") run();
