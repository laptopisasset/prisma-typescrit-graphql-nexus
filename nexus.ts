import { ApolloServer } from "apollo-server";
import { objectType, makeSchema } from "nexus";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Query = objectType({
  name: "Query",
  definition: (t) => {
    t.string("hello", {
      resolve: () => "hello world",
    });
    t.list.field("users", {
      type: User,
      resolve: async () => {
        const users = await prisma.user.findMany();
        return users;
      },
    });
  },
});

const User = objectType({
  name: "User",
  definition: (t) => {
    t.int("id");
    t.string("email");
    t.string("name");
  },
});

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: __dirname + "/schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});

const server = new ApolloServer({
  schema,
});

server
  .listen()
  .then(({ url }) => console.log(`🚀 Server listening at : ${url}`))
  .catch(console.error);
