import { Express, NextFunction, Request, Response } from "express";

import { printRegisterRoute } from "utils/logger/routes";
import { Methods } from "types/enums";
import { Middleware } from "types/types";
import { printResponse } from "utils/logger/request";

type Route = {
  app: Express;
  service: { new (): {} };
  propertyKey: string;
  method: Methods;
  route: string;
  handler: Middleware;
  middlewares?: Middleware[];
  onBefore?: Middleware[];
  onAfter?: Middleware[];
};

export default ({
  app,
  service,
  propertyKey,
  method,
  route,
  handler,
  middlewares,
  onBefore = [],
  onAfter = [],
}: Route) => {
  try {
    if (app && service && propertyKey && Methods[method] && route) {
      const existingRoute = app._router.stack.find(
        (registeredRoute: {
          route: { path: string; methods: { [key: string]: boolean } };
        }) =>
          registeredRoute?.route?.path === route &&
          registeredRoute?.route?.methods?.[method.toLowerCase()]
      );

      if (!existingRoute) {
        const before = onBefore.map(
          (hook) => async (req: Request, res: Response, next: NextFunction) => {
            await hook(req, res, next);

            next();
          }
        );

        const after = onAfter.map(
          (hook, index) =>
            async (req: Request, res: Response, next: NextFunction) => {
              const afterHook = await hook(req, res, next);

              if (index + 1 < onAfter?.length) {
                next();
              } else if (!res.headersSent) {
                const response = afterHook || res.locals.__handlerResponse__;

                res.status(200);
                res.send(response);

                printResponse(req);
              }
            }
        );

        const requestHandler = async (
          req: Request,
          res: Response,
          next: NextFunction
        ) => {
          try {
            res.locals.__handlerResponse__ = await handler(req, res, next);

            if (after.length) {
              next();
            } else if (!res.headersSent) {
              res.status(200);
              res.send(res.locals.__handlerResponse__);

              printResponse(req);
            }
          } catch (error) {
            next(error);
          }
        };

        app[Methods[method].toLowerCase() as keyof Express]?.(
          route,
          ...(middlewares ? middlewares : []),
          ...before,
          requestHandler,
          ...after
        );

        printRegisterRoute(method, route, service.name, propertyKey);
      }
    }
  } catch (error) {
    //
  }
};
