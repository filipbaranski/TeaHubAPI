const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: String,
    password: String,
    token: String,
  },
  { collection: "Users" }
);

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
