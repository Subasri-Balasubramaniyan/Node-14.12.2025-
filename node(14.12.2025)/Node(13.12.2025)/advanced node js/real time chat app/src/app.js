const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

async function createApp() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  app.use(express.static("public"));


  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server)
  );

  return app;
}

module.exports = createApp;
