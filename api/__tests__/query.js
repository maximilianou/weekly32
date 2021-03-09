/* __test__/query.js */
const app = require("../src/server");
const supertest = require("supertest");
const request = supertest(app);
test('fetch authors', async (done) => {
  request
    .post("graphql")
    .send({
      query: '{authors { id, name} }',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res){
      if(err) return done(err);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.users.length).toEqual(3);
      done();
    });
});

test('query that not exist', async () => {
  const response = await request
    .post('/graphql')
    .send({
      query: '{events{id, name}}',
    })
    .set('Accept', 'application/json');
  expect(response.status).toBe(400);
});