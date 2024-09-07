import { Methods } from "types/enums";
import { MethodConfiguration, TypedMethodDecorator } from "../types";

function methodDecoratorFactory(method: Methods) {
  return function (config: MethodConfiguration): TypedMethodDecorator {
    return function (target, propertyKey, descriptor) {
      Object.defineProperty(target, "routes", {
        value: [
          ...(target.routes?.length ? target.routes : []),
          {
            method,
            path: typeof config === "string" ? config : config.path,
            fullPath: typeof config === "string" ? undefined : config.fullPath,
            propertyKey,
            handler: descriptor.value,
          },
        ],
        writable: true,
        enumerable: true,
      });

      descriptor.enumerable = true;
    };
  };
}

export const Get = methodDecoratorFactory(Methods.GET);
export const Post = methodDecoratorFactory(Methods.POST);
export const Put = methodDecoratorFactory(Methods.PUT);
export const Patch = methodDecoratorFactory(Methods.PATCH);
export const Delete = methodDecoratorFactory(Methods.DELETE);
