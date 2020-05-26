const { Client } = require("pg");
var request = require("request");

const client = new Client({
  // database: "postgres",
  // user: "app_user",
  // password: "1234",
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client
  .connect()
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Could not connect to database! ", err);
  });

class User {
  static create(userData) {
    const text =
      "INSERT INTO user_profile (steamid, username, fullname, loc_code, rank_medal) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [
      userData.steamid,
      userData.personaname,
      userData.realname,
      userData.loccountrycode,
      "",
    ];
    client.query(text, values, (err, res) => {
      err ? console.log(err) : console.log(res.rows);
    });
  }

  static getById(userId) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM user_profile WHERE steamid = $1";
      const value = [userId];

      client.query(sql, value, (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          // resolve(res);
          resolve(res.rows[0]);
        }
      });
    });
  }
}

module.exports = User;
