import express from "express";

import { printIncoming, printResponse, printError } from "utils/logger/request";

import {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

const initBefore = (app: Application): void => {
  app.use(express.json()); // for parsing application/json

  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.use((req, res, next) => {
    printIncoming(req);

    next();
  });
};

const initAfter = (app: Application): void => {
  app.use((req, res, next) => {
    printResponse(req);

    next();
  });

  app.use(
    (
      err: ErrorRequestHandler & { message: string; code: number },
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      printError(req, err);

      if (res.headersSent) {
        return next(err);
      }

      const errorCode = err.code >= 200 && err.code <= 527 ? err.code : 500;

      res
        .status(500)
        .send({ error: err, message: err.message, code: errorCode });
    }
  );
};

export { initBefore, initAfter };
