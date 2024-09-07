/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction, Express } from "express";
import { Ctor, DbMethods, IService } from "./interfaces";

import Service from "services/Service";
export type Middleware<Entity = {}> = (
  req: Request & { params?: Entity },
  res: Response,
  next: NextFunction
) => Promise<void | Entity | unknown> | Entity | void;

export type Route = {
  method: string;
  path: string | undefined;
  fullPath: string | undefined;
  propertyKey: string;
  handler: () => {};
};

export type ServiceDefinition<Entity = {}> = {
  Service: new (...args: any[]) => Service<Entity>;
  name: string;
  dbAdapter?: DbMethods<Entity>;
};

export type Hooks = {
  before?: { [key: string]: Middleware[] };
  after?: { [key: string]: Middleware[] };
};

export type Application = { app: Express; port: number };

export type MethodConfiguration =
  | string
  | {
      path: string;
      fullPath?: never;
      authorize?: boolean;
      authenticate?: boolean;
    }
  | {
      path?: never;
      fullPath: string;
      authorize?: boolean;
      authenticate?: boolean;
    };

export type TypedMethodDecorator = <T>(
  target: { routes: Route[] },
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
) => void;

export namespace Decorators {
  export namespace Controllers {
    export type Controller = <A>(arg: {
      rest: string;
      hideRoutes?: string[];
      dbAdapter?: DbMethods<A>;
    }) => <T extends Ctor<IService<A>>>(target: T) => T;
  }
}
