const { Client } = require("pg");
var request = require("request");

const client = new Client({
  database: "postgres",
  user: "app_user",
  password: "1234",
  connectionString: process.env.DATABASE_URL,
});

client
  .connect()
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Could not connect to database! ", err);
  });

var CreateUser = function (userData) {
  var SteamID = userData.steamid;
};
