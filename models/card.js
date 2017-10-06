const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const CardSchema = new Schema({
  text: {
    type: String
  }
});

CardSchema.plugin(uniqueValidator);

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
