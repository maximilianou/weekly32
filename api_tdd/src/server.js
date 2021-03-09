/* src/server.js */
const express = require("express");
const expressGraphQL = require('express-graphql');
const schema = require("./schema");
const resolvers = require("./resolvers");
const { startDatabase } = require("./database");
const expressPlayground = require("graphql-playground-middleware-express").default;
const context = async () => {
  const db = await startDatabase();
  return { db };
}
const app = express();
app.use(
  "graphql",
  expressGraphQL.graphqlHTTP({
    schema,
    rootValue: resolvers,
    context
  })
);
// GraphQLPlayGround route
app.get("playground", expressPlayground( { endpoint: "/graphql"} ));
module.exports = app;
