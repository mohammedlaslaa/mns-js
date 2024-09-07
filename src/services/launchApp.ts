import { initAfter } from "middlewares";
import { runServices } from "./index";
import { PUBLIC_API } from "utils/constants";
import logger from "utils/logger";
import { apps } from "index";

export default async () => {
  // Run services
  await runServices();

  for (const [index, { app, port }] of apps.entries()) {
    app.get("*", function (req) {
      throw {
        code: 404,
        message: `Can not ${req.method} ${req.path} on: ${
          req.protocol
        }://${req.header("host")}`,
      };
    });

    initAfter(app);

    // Launch server
    await app.listen(port);

    logger.info(
      `Server${
        apps?.length > 1 ? ` ${index + 1}` : ""
      } is running at ${PUBLIC_API}:${port}`
    );
  }
};
