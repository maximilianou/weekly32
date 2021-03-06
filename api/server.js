const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();
const { GraphQLSchema, 
        GraphQLObjectType,
        GraphQLString,
        GraphQLList,
        GraphQLInt,
        GraphQLNonNull
      } = require('graphql');

const authors = [
  { id: 1, name: 'Kent Beck'},
  { id: 2, name: 'Martin Fowler'},
  { id: 3, name: 'Bjarme Stroustrup'}  
];

const books = [
  { id: 1, name: 'eXtremme Programing Explained', authorId: 1},
  { id: 2, name: 'UML Distilled', authorId: 2},
  { id: 3, name: 'Analist UML Design Patterns', authorId: 2},
  { id: 4, name: 'C++, Creator of C++', authorId: 3},
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a Book',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: { 
      type: AuthorType,
      resolve: (book) => ( authors.find(author => author.id === book.authorId ))
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents a Author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: 'List of all books',
      resolve: () => (books)
    }
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType
});

app.use('/graphql', expressGraphQL.graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(5000, () => { console.log('Running!') });