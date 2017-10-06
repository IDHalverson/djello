const { User } = require("../models");

module.exports = {
  port: process.env.PORT || process.argv[2] || 3000,
  host: "localhost",
  session: {
    secret: "candlelight",
    resave: true,
    saveUninitialized: true
  },
  morgan: "tiny",
  bodyParser: { extended: true },
  serverCallback: ({ port, host }) => () => {
    console.log(`Listening: http://${host}:${port}`);
  },
  passportSerializeUser: (user, done) => {
    done(null, user._id);
  },
  passportDeserializeUser: (_id, done) => {
    User.findById(_id)
      .populate({
        path: "boards",
        model: "Board",
        populate: {
          path: "lists",
          model: "List",
          populate: { path: "cards", model: "Card" }
        }
      })
      .then(user => {
        done(null, user);
      });
  }
};
