/* eslint-disable @typescript-eslint/no-explicit-any */
import { apps } from "index";

import registerRoute from "routes/registerRoute";

import { Application, Decorators, Route } from "types/types";
import validation from "middlewares/validation";
import { initBefore } from "middlewares";

const Controller: Decorators.Controllers.Controller =
  ({ rest, dbAdapter, hideRoutes = [] }) =>
  (target) => {
    return class extends target {
      constructor(...args: any[]) {
        super(...args);

        let serviceApp: Application | undefined = apps.find(
          (app) => app.port === this.port
        );

        import("express").then((app) => {
          if (dbAdapter) this.dbAdapter = dbAdapter;

          if (this.port) {
            if (!serviceApp) {
              serviceApp = { app: app.default(), port: this.port };

              apps.push(serviceApp);
            }

            initBefore(serviceApp.app);

            let routes = target.prototype.routes;

            const defaultRoutes = ["get", "list", "create", "update", "remove"];

            routes = [
              ...target.prototype.routes.filter(
                (route: { propertyKey: string }) =>
                  !defaultRoutes.includes(route.propertyKey)
              ),
              ...target.prototype.routes.filter(
                (route: { propertyKey: string }) =>
                  defaultRoutes.includes(route.propertyKey)
              ),
            ];

            if (routes && serviceApp?.app && this.dbAdapter) {
              const sortedRoutes = routes.sort((a: Route, b: Route) => {
                const aPath = a.fullPath || a.path || "";
                const bPath = b.fullPath || b.path || "";

                return (
                  (aPath.includes("/:") ? 1 : 0) -
                  (bPath.includes("/:") ? 1 : 0)
                );
              });

              for (const route of sortedRoutes) {
                const validator =
                  this.validators &&
                  this.validators[route.propertyKey] &&
                  validation(this.validators[route.propertyKey]);

                const onBefore = this.hooks?.before?.[route.propertyKey];
                const onAfter = this.hooks?.after?.[route.propertyKey];

                if (!hideRoutes.includes(route.propertyKey))
                  registerRoute({
                    app: serviceApp.app,
                    service: target,
                    route: `${
                      route.fullPath
                        ? route.fullPath
                        : `${rest}${route.path === "/" ? "" : route.path}`
                    }`,
                    method: route.method,
                    propertyKey: route.propertyKey,
                    handler: route.handler.bind(this),
                    middlewares: [...(validator ? [validator] : [])],
                    onAfter,
                    onBefore,
                  });
              }
            }
          }
        });
      }
    };
  };

export default Controller;
