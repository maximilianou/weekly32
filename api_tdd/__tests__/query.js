/* __test__/query.js */
const app = require("../src/server");
const supertest = require("supertest");
const { stopDatabase } = require("../src/database");
const request = supertest(app);
afterAll(async () => {
  await stopDatabase();
});
test('fetch users', async (done) => {
  request
    .post("graphql")
    .send({
      query: '{users { id, name} }',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res){
      if(err) return done(err);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.users.length).toEqual(2);
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