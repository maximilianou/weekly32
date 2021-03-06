# weekly32

graphql nodejs postgres express

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
## Step 7: Javascript Nodejs GraphQL 

