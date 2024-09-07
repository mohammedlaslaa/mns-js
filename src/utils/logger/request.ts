import logger from "./index";

import { ErrorRequestHandler, Request } from "express";

const printIncoming = (req: Request): void => {
  logger.info({
    flat: true,
    gray: "=>",
    cyan: `${req.method} ${req.originalUrl}`,
  });
};

const printResponse = (req: Request): void => {
  logger.info({
    flat: true,
    gray: "<=",
    yellow: `${req.method} ${req.originalUrl}`,
  });
};
const printError = (
  req: Request,
  err: ErrorRequestHandler & { message: string; code: number }
): void => {
  logger.error({
    flat: true,
    gray: "<=",
    cyan: `${req.method} ${req.originalUrl}`,
  });
};

export { printIncoming, printResponse, printError };

export default {
  printIncoming,
  printResponse,
  printError,
};
