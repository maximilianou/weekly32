# weekly32

GraphQL NodeJS Express

1. **Javascript Nodejs GraphQL API**
1. **Javascript Nodejs GraphQL Data Typed and RootQueryType**
1. **Javascript Nodejs GraphQL Relationship Books -> Author**
1. **Javascript Nodejs GraphQL Books and Authors Search**
1. **Javascript Nodejs GraphQL Parameters**
1. **Javascript Nodejs GraphQL filtering parameter**
1. **Javascript Nodejs GraphQL Mutations addBook**
1. **Javascript Nodejs GraphQL Mutation addAuthor**

References: 
- https://www.youtube.com/watch?v=ZQL7tL2S0oQ
- https://thenewstack.io/automatic-testing-for-graphql-apis/

---
## Step 1: Javascript Nodejs GraphQL API

```
:~/projects/weekly32/api$ npm i express express-graphql graphql
:~/projects/weekly32/api$ npm i nodemon -D
```
- package.json
```json
{
  "name": "api",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "express-graphql": "^0.12.0",
    "graphql": "^15.5.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}
```
- server.js
```js
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
```

---
## Step 2: Javascript Nodejs GraphQL Data Typed and RootQueryType

```js
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
    id: {type: GraphQLNonNull(GraphQLInt)},
    name: {type: GraphQLNonNull(GraphQLString)},
    authorId: {type: GraphQLNonNull(GraphQLInt)}
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
```


---
## Step 3: Javascript Nodejs GraphQL Relationship Books -> Author

```js
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
```

```js
{books{
  id 
  name
  author{
    name
  }
}}
```

```js
{
  "data": {
    "books": [
      {
        "id": 1,
        "name": "eXtremme Programing Explained",
        "author": {
          "name": "Kent Beck"
        }
      },
      {
        "id": 2,
        "name": "UML Distilled",
        "author": {
          "name": "Martin Fowler"
        }
      },
      {
        "id": 3,
        "name": "Analist UML Design Patterns",
        "author": {
          "name": "Martin Fowler"
        }
      },
      {
        "id": 4,
        "name": "C++, Creator of C++",
        "author": {
          "name": "Bjarme Stroustrup"
        }
      }
    ]
  }
}
```

---
## Step 4: Javascript Nodejs GraphQL Books and Authors Search
```js
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
      resolve: () => books
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of all authors',
      resolve: () => authors
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
```

---
## Step 4: Javascript Nodejs GraphQL Relationship Author -> Books

```js
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
    books: {
      type: new GraphQLList(BookType),
      description: 'List of all books',
      resolve: () => books
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of all authors',
      resolve: () => authors
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
```

---
## Step 5: Javascript Nodejs GraphQL Parameters


```js
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
```

```js
{ book(id:1){ 
    name
    author {
      name
    }
  }
}
```

---
## Step 6: Javascript Nodejs GraphQL filtering parameter


```js
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

const schema = new GraphQLSchema({
  query: RootQueryType
});

app.use('/graphql', expressGraphQL.graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(5000, () => { console.log('Running!') });
```

```js
{ author(id:2){ 
    name
    books {
      name
    }
  }
}
```
---
---
## Step 7: Javascript Nodejs GraphQL Mutations addBook

```js
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
```

```js
mutation { addBook(
    name: "Pair Programming"
    authorId: 1
  ) {
  id
  }
}
```

---
## Step 8: Javascript Nodejs GraphQL Mutation addAuthor

```js
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
```

```js
mutation { addAuthor( name: "Bruce Eckel") {
    name
    id

} }
```

---------
---------
### TDD
---
## Step 9: Javascript Nodejs GraphQL TDD Install

```
:~/projects/weekly32/tdd$ npm init -y
:~/projects/weekly32/tdd$ npm i graphql express express-graphql
:~/projects/weekly32/tdd$ npm i apollo-server-express
:~/projects/weekly32/tdd$ npm i -D jest supertest
```

- package.json
```json
{
  "name": "tdd",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "./node_modules/.bin/jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "apollo-server-express": "^2.21.1",
    "express": "^4.17.1",
    "express-graphql": "^0.12.0",
    "graphql": "^15.5.0"
  },
  "devDependencies": {
    "jest": "^26.6.3",
    "supertest": "^6.1.3"
  }
}
```
- __tests__/types.test.js
```js
const { gql } = require('apollo-server-express');
const { productType } = require('../src/types');
test('check if type Product has correct fields', () => {
  expect(productType).toBe(gql`
    type Product {
      title: String!
      price: Float!
    }
  `);
});
```
- src/types.js
```js
const { gql } = require('apollo-server-express');
const productType = gql`
  type Product {
    title: String!
    price: Float!
  }
`;
module.exports = { 
  productType
};
```
- __tests__/resolver.test.js
```js
const { productReviewsResolver } = require('../src/resolvers');
test('Should return the reviews', () => {
  const obj = {
    reviews: [{
      average: 4.5,
      description: 'Great'
    }]
  }
  expect( productReviewsResolver(obj, {}, {}) ).toEqual(obj.reviews);
});
```
- src/resolvers.js
```js
const productReviewsResolver = () => ([{
  average: 4.5,
  description: 'Great'
}])
module.exports = { productReviewsResolver }
```

---
## Step 10: Javascript Nodejs GraphQL API(back) UI(Front) React

```
:~/projects/weekly32/app/back$ npm init -y
:~/projects/weekly32/app/back$ npm i express graphql express-graphql
:~/projects/weekly32/app/back$ npm i -D nodemon

:~/projects/weekly32/app$ npm init react-app ui
:~/projects/weekly32/app/ui$ npm i @apollo/client graphql

```
- query ( search )
```js
query { lang(id:3) {
  id, lang, liked
}}
```
- mutation ( add )
```js
mutation { 
  lang(lang:"Scala", liked:true) { 
  lang, liked
  }
}
```

- app/api/index.js
```js
const app = require('./server');
const port = process.env.PORT || '5000';
app.listen(port, () => { console.log(` 🗺  Running! http://localhost:${port}/graphql`) });
```
- app/api/server.js
```js
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
```

- app/ui/index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

client.query({
  query: gql`
    query languageQuery {
      langs {
        id
        lang
        liked
      }
    }
  `
}).then(result => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.querySelector('#root')
);
```
- app/ui/App.js
```js
import { Lang } from './comp/Lang';
function App() {
  return (
    <div className="App">
      <Lang></Lang>
    </div>
  );
}
export default App;
```
- app/ui/comp/Lang.js
```js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const LANG_DATA = gql`
  query languageQuery {
    langs {
      id
      lang
      liked
    }
  }
`;

export const Lang = () => {
  const { data, loading, error} = useQuery(LANG_DATA);
  if( loading ) return <p> 🗺 Loading..</p>;
  if( error ) return <p> 🗺 Error. {error}</p>;
  return (
    <div><h2> 🗺 </h2>
     {data.langs.length > 0 && data.langs.map( ( {id, lang, liked} ) => {
       return(<div key={id}>{lang}, {liked}</div>);
     }
     )}
    </div>
    );
}
```

