// npm modules / packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const morgan = require("morgan");
const morganToolkit = require("morgan-toolkit")(morgan);
const methodOverride = require("method-override");
const getPostSupport = require("express-method-override-get-post-support");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const passportLocal = require("passport-local");
const path = require("path");
const compression = require("compression");

// configure env variables
dotenv.config();

// connect to database
require("../mongo")();
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);

// import local configurations
const configs = require("./server-configs");

// import middleware
const mw = require("./middleware");

// import local routers
const routers = require("../routers");

//import passport strategies
const localStrategy = require("../strategies/local");

// middleware registration
app.use(morgan(configs.morgan));
app.use(cookieParser("candlelight"));
app.use(bodyParser.json(configs.bodyParser));
app.use(expressSession(configs.session));
app.use(morganToolkit());
app.use(methodOverride(getPostSupport.callback, getPostSupport.options));
app.use(mw.startMongo(mongoose));
app.use(mw.logConnections);
app.use(passport.initialize());
app.use(passport.session());
app.use(mw.handleCors);
app.use(compression());
app.use(express.static("./build"));

// set up Passport strategies
passport.use(new passportLocal.Strategy(localStrategy));
passport.serializeUser(configs.passportSerializeUser);
passport.deserializeUser(configs.passportDeserializeUser);

app.get("*", (req, res) => {
  console.log("hit");
  res.sendFile(path.join(__dirname, "index.html"));
});
app.use("/:param", routers(passport));

// start server
const { port, host, serverCallback } = require("./server-configs");
let args = process.env.NODE_ENV === "production" ? [port] : [port, host];
args.push(serverCallback({ port, host }));
app.listen.apply(app, args);

module.exports = app;
