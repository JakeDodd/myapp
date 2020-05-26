require("dotenv").config();
const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const passport = require("passport");
var util = require("util");
var session = require("express-session");
var SteamStrategy = require("passport-steam");
var request = require("request");
var User = require("./models/User");
var cookieParser = require("cookie-parser");
const { isProduction } = require("./utils/constants");

const redis = require("redis");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient(process.env.REDIS_URL);

const app = express();
const port = process.env.PORT || 3002;

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(cookieParser());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "your-secret",
    cookie: {
      secure: false,
    },
    name: "s",
    resave: true,
    saveUninitialized: true,
  })
);

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log("serialize user");
  done(null, user.id);
});

// comment
passport.deserializeUser(async function (userId, done) {
  try {
    const user = await User.getById(userId);
    console.log({ deserializeUser: user });
    done(null, user);
  } catch (err) {
    console.error(err);
  }
});

passport.use(
  new SteamStrategy(
    {
      returnURL: `${
        isProduction
          ? "https://my-first-node-app1.herokuapp.com"
          : "http://localhost:3002"
      }/api/auth/steam/return`,
      realm: isProduction
        ? "https://my-first-node-app1.herokuapp.com"
        : "http://localhost:3002",
      apiKey: process.env.STEAM_API_KEY,
    },
    function (identifier, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        // To keep the example simple, the user's Steam profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Steam account with a user record in your database,
        // and return that user instead.
        profile.identifier = identifier;
        console.log(identifier.slice(37));
        console.log(profile._json);
        User.create(profile._json);

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
// app.use(express.static(__dirname + "/../../public"));

const api = express.Router();
app.use("/api", api);

api.get("/", (req, res) => res.send("Hello World!"));
api.get("/me", (req, res) => {
  console.log({ req: req.user });
  res.send(req.user);
});

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
api.get(
  "/auth/steam",
  passport.authenticate("steam", { failureRedirect: "/api" }),
  function (req, res) {
    res.redirect("/api");
  }
);

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
api.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/api" }),
  function (req, res) {
    res.redirect("/api");
  }
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

request(
  "https://api.opendota.com/api/players/191652423/recentMatches?api_key=14491962C393719A3C8CDCAB8D91BB12",
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const a = body.replace("[", "");
      const b = a.replace("]", "");
      // console.log(b);
    }
  }
);
