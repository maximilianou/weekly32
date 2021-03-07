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
      type: GraphQLList(AuthorType),
      resolve: (book) => ( authors.filter(author => author.id === book.authorId ))
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents a Author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: { 
      type: GraphQLList(BookType),
      resolve: (author) => ( books.filter(book => book.authorId === author.id ))
    }

  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'One book',
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args) => books.find( book => book.id === args.id)
    },
    books: {
      type: new GraphQLList(BookType),
      description: 'List of all books',
      resolve: () => books
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of all authors',
      resolve: () => authors
    },
    author: {
      type: AuthorType,
      description: 'One author',
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args) => authors.find( author => author.id === args.id )
    }
  })
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'add a book',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const book = { 
          id: books.length + 1, 
          name: args.name,
          authorId: args.authorId
         }
         books.push(book);
         return book;
      }
    },
    addAuthor: {
      type: AuthorType,
      description: 'add a author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const author = { 
          id: authors.length + 1, 
          name: args.name
        }
        authors.push(author);
        return author;
      }
    }
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

app.use('/graphql', expressGraphQL.graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(5000, () => { console.log('Running!') });