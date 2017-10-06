const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const uuid = require("uuid/v4");
const md5 = require("md5");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    unique: true
  },
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Board"
    }
  ],
  token: {
    type: String,
    unique: true
  }
});

UserSchema.plugin(uniqueValidator);

UserSchema.virtual("password").set(function(value) {
  this.hashedPassword = bcrypt.hashSync(value, 12);
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.hashedPassword);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
