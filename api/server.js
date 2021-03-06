const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();
const { GraphQLSchema, 
        GraphQLObjectType,
        GraphQLString
      } = require('graphql');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Hi_Books',
    fields: () => ({
      message: { 
        type: GraphQLString,
        resolve: () => (
           'Hi here the Strong Typed data'
        )
      }
    })
  })
});


app.use('/graphql', expressGraphQL.graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(5000, () => { console.log('Running!') });