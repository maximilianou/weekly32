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
