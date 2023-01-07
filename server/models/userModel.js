const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    max: 15,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 50,
  },
  isIconSet: {
    type: Boolean,
    default: false,
  },
  iconImage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Users", userSchema);
