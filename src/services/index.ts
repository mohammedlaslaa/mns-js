import fs from "fs";
import path from "path";

import { ServiceDefinition } from "types/types";
import logger from "../utils/logger";

const serviceRegex = new RegExp(".*(.service.(js|ts))$");

export const runServices = async () => {
  // Methods to display directory
  let files: string[] = [];

  const arrayDirName = __dirname.split("\\");

  for (const [index, arrayDirNameElement] of [...arrayDirName]
    .reverse()
    .entries()) {
    if (index > 0 && index !== arrayDirName.length - 1) {
      const directoryIndex = arrayDirName.indexOf(arrayDirNameElement);

      const filePath = path.resolve(
        arrayDirName.slice(0, directoryIndex + 1).join("\\"),
        process.env.SERVICES_DIR || "services"
      );

      const isExistDir = fs.existsSync(filePath);

      if (isExistDir) {
        const servicesFiles = fs
          .readdirSync(filePath)
          .filter((fileName) => serviceRegex.test(fileName));

        if (servicesFiles.length) {
          files = [
            ...files,
            ...servicesFiles.map((servicesFile) =>
              path.join(filePath, servicesFile)
            ),
          ];
        }
      }
    }
  }

  for (const file of files) {
    const service: ServiceDefinition | null = (await import(file)).default;

    if (service && service.Service) {
      logger.info(`${service.name} service loading...`);
      await new service.Service(service.name, service.dbAdapter);
    }
  }
};
