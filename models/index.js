const mongoose = require("mongoose");
const bluebird = require("bluebird");

mongoose.Promise = bluebird;

const models = {
  User: require("./user"),
  Board: require("./board"),
  Card: require("./card"),
  List: require("./list")
};

module.exports = models;
