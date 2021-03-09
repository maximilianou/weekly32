/* src/index.js */
const app = require('./server');
const port = process.env.PORT || '4000';
app.listen(port);
console.log(`Server ready: http://localhost:${port}/graphql`);