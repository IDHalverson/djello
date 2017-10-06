const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const ListSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card"
    }
  ]
});

ListSchema.plugin(uniqueValidator);

const List = mongoose.model("List", ListSchema);

module.exports = List;
