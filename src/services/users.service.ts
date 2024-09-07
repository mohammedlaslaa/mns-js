import Controller from "../types/decorators/Controller";
import { Hooks, ServiceDefinition } from "../types/types";
import { Get } from "../types/decorators/methods";
import type { User } from "@prisma/client";

import { z } from "zod";
import Service from "./Service";
import { PrismaClient } from "@prisma/client";

const userAdapter = new PrismaClient({
  errorFormat: "minimal",
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

class Users extends Service {
  validators = {
    create: z.object({ email: z.string() }),
  };

  hooks: Hooks = {
    before: {
      test: [
        async (__, res) => {
          res.locals.hehe = "hehe";
          //
        },
      ],
    },
  };

  @Get("/")
  override async get() {
    console.log("hehehe");
    return;
  }
}

const definition: ServiceDefinition = {
  Service: Users,
  name: "users",
};

export default definition;
