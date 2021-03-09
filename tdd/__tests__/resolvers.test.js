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