import { ZodSchema } from "zod";
import { Hooks, Middleware, Route } from "./types";

export interface DbMethods<Entity> {
  findFirst(data: {}): Promise<Entity | null> | void;
  findUnique(data: {}): Promise<Entity | null> | void;
  findMany(data: {}): Promise<Entity[] | [] | null>;
  create(args: { data: Partial<Entity> | {} }): Promise<Entity | null>;
  createMany(args: { data: Entity[] }): Promise<{ count: number }>;
  update(data: Partial<Entity> | {}): Promise<Entity | null>;
  delete(data: {}): Promise<Entity | null>;
}

export interface IService<Entity = {}> {
  name: string;

  routes?: Route[];
  port?: number;
  validators?: { [key: string]: ZodSchema };
  hooks?: Hooks;
  dbAdapter?: DbMethods<Entity>;

  create?: Middleware<Entity>;
  get?: Middleware<Entity>;
  list?: Middleware<Entity[]>;
  remove?: Middleware<Entity>;
}

export type Ctor<I> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): I;
};
