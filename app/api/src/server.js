const express = require('express');
const { GraphQLObjectType, 
  GraphQLInt, 
  GraphQLString, 
  GraphQLBoolean, 
  GraphQLList, 
  GraphQLSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const cors  = require('cors');

const app = express();
app.use(cors());

const seedData  = [
  { id: 1, lang: 'Javascript', liked: true},
  { id: 2, lang: 'Rust', liked: true},
  { id: 3, lang: 'Typescript', liked: true},
];

const langType = new GraphQLObjectType({
  name: 'Language',
  description: 'Programing Languages',
  fields: {
    id: {
      type: GraphQLInt
    },
    lang: {
      type: GraphQLString
    },
    liked: {
      type: GraphQLBoolean
    }
  }
});

const rootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'This is the root query',
  fields: {
    langs: {
      type: GraphQLList( langType ),
      resolve: () => seedData
    },
    lang: {
      type: langType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, context, info) => (
        seedData.find( lang => lang.id === args.id)
        )
    }
  }
});

const rootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'This is the root mutation',
  fields: {
    lang: {
      type: langType,
      args: {
        lang: { 
          type: GraphQLString },
        liked: { 
          type: GraphQLBoolean }
      },
      resolve: (parent, args, context, info) => {
        const current = { id: seedData.length+1, lang: args.lang, liked: args.liked}
        seedData.push(current);
        return current;
      }
    }
  }
});


const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation
});

app.use('/graphql', graphqlHTTP({
  schema, 
  graphiql: true,  
}));
module.exports = app;