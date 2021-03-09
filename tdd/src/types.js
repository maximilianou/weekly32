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