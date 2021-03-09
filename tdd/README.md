### TDD
---
## Step: Javascript Nodejs GraphQL TDD

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

