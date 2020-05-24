const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const passport = require("passport");
var util = require("util");
var session = require("express-session");
var SteamStrategy = require("passport-steam");
var request = require("request");

const app = express();
const port = process.env.PORT || 3002;

const api = express.Router();
app.use("/api", api);

// const client = new Client({
//   database: "postgres",
//   user: "app_user",
//   password: "1234",
//   connectionString: process.env.DATABASE_URL,
// });

// client
//   .connect()
//   .then(() => {
//     console.log("Connected to the database!");
//   })
//   .catch((err) => {
//     console.error("Could not connect to database! ", err);
//   });

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:3002/auth/steam/return",
      realm: "http://localhost:3002/",
      apiKey: "14491962C393719A3C8CDCAB8D91BB12"
    },
    function(identifier, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function() {
        // To keep the example simple, the user's Steam profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Steam account with a user record in your database,
        // and return that user instead.
        profile.identifier = identifier;
        console.log(identifier.slice(37));
        console.log(profile._json);

        // request(
        //   "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=14491962C393719A3C8CDCAB8D91BB12&steamids=" +
        //     identifier.slice(37),
        //   function (error, response, body) {
        //     if (!error && response.statusCode == 200) {
        //       console.log(JSON.parse(body).response.players[0].steamid);
        //     }
        //   }
        // );
        return done(null, profile);
      });
    }
  )
);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(
  session({
    secret: "your secret",
    name: "name of session id",
    resave: true,
    saveUninitialized: true
  })
);

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/../../public"));

api.get("/", (req, res) => res.send("Hello World!"));
// api.get("/users", async (req, res) => {
//   const databaseRes = await client.query("SELECT * from users");
//   const users = databaseRes.rows[0];

//   res.send(users);
// });

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
app.get(
  "/auth/steam",
  passport.authenticate("steam", { failureRedirect: "/api" }),
  function(req, res) {
    res.redirect("/api");
  }
);

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/api" }),
  function(req, res) {
    res.redirect("/api");
  }
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

request(
  "https://api.opendota.com/api/players/191652423/recentMatches?api_key=14491962C393719A3C8CDCAB8D91BB12",
  function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const a = body.replace("[", "");
      const b = a.replace("]", "");
      // console.log(b);
    }
  }
);
