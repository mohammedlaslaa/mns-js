/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";

import { DbMethods, IService } from "types/interfaces";
import { Get, Post, Delete, Put } from "types/decorators/methods";
import { Route } from "../types/types";

import logger from "utils/logger";
import { PORT_API } from "utils/constants";

export default class Service<Entity = {}> implements IService<Entity> {
  name: string;
  port: number;
  logger = logger;
  routes: Route[] = [];
  dbAdapter?: DbMethods<Entity>;

  constructor(name: string, dbAdapter?: DbMethods<Entity>) {
    this.name = name;
    this.port = PORT_API;

    if (dbAdapter) this.dbAdapter = dbAdapter;
  }

  @Get({ fullPath: "/get/test", authorize: true })
  async list(req: Request) {
    if (this.dbAdapter) return this.dbAdapter.findMany(req.params);
  }

  @Get("/:id")
  async get(req: Request) {
    if (this.dbAdapter)
      return this.dbAdapter.findUnique({
        where: { id: parseInt(req.params.id, 10) },
      });
  }

  @Post("/")
  async create(req: Request) {
    if (this.dbAdapter) {
      return this.dbAdapter.create({ data: req.body });
    }
  }

  @Put("/:id")
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (this.dbAdapter) {
        const params = req.params;

        const updatedEntity = await this.dbAdapter.update(params);

        if (!updatedEntity) next(updatedEntity);

        res.send(updatedEntity);
      }
    } catch (error) {
      next(error);
    }
  }

  @Delete("/:id")
  async remove(
    req: Request & { params: Entity },
    res: Response,
    next: NextFunction
  ) {
    try {
      if (this.dbAdapter) {
        const entity = await this.dbAdapter.delete({ where: req.params });

        res.send(entity);
      }
    } catch (error) {
      next(error);
    }
  }
}
