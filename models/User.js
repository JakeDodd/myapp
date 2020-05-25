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

const User = {
  createUser: function (userData) {
    const text =
      "INSERT INTO user_profile (steamid, username, fullname, loc_code, rank_medal) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [
      userData.steamid,
      userData.personaname,
      userData.realname,
      userData.loccountrycode,
      "",
    ];
    client.query("BEGIN", (err) => {
      err
        ? console.log("Error starting transaction", err)
        : console.log("begin successful");
      client.query(text, values, (err, res) => {
        err ? console.log(err) : console.log(res.rows);
        client.query("COMMIT", (err) => {
          err
            ? console.log("Error committing transaction", err)
            : console.log("commit successful");
        });
      });
    });
  },
};

module.exports = User;
