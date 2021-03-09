/* src/database.js */
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb"); 
const data = require("./data");

let database = null;

const mongo = new MongoMemoryServer();

async function startDatabase(){
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };  
  const mongoDBURL = await mongo.getUri();
  const connection = await MongoClient.connect(
    mongoDBURL, 
    opts,
    err => {
      if (err) {
        console.error(err);
      }
    });

  // Seed Database
  if(!database){
    database = connection.db();
    await database.collection("users").insertMany(data.Users);
  }
  return database;
}
async function stopDatabase(){
  await mongo.stop();
}

module.exports = {
  startDatabase,
  stopDatabase
};
