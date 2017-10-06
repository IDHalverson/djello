const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const BoardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: "List"
    }
  ]
});

BoardSchema.plugin(uniqueValidator);

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
