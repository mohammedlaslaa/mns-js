import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export default (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parse(req.body);
    } catch (e) {
      next(e);
    }

    next();
  };
};
