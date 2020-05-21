const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3002;

const api = express.Router();
app.use("/api", api);

api.get("/", (req, res) => res.send("Hello World!"));
api.get("/users", async (req, res) => {
  const databaseRes = await client.query("SELECT * from users");
  const users = databaseRes.rows[0];

  res.send(users);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

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
