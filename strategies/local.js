const { User } = require("../models");

const localStrategy = (username, password, done) => {
  User.findOne({
    email: username
  })
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
      if (user && user.validatePassword(password)) {
        console.log("ok");
        done(null, user);
      } else {
        console.log("error");
        done(null, false, { message: "validation failed" });
      }
    })
    .catch(err => {
      console.log(err);
      done(err);
    });
};

module.exports = localStrategy;
