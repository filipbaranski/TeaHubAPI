const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: String,
    password: String,
    token: String,
    role: String,
  },
  { collection: "Users" }
);

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;