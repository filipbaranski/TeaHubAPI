const mongoose = require("mongoose");

const PeriodicSchema = mongoose.Schema(
  {
    dayNumber: String,
    event: String,
    userId: String,
  },
  { collection: "Periodic" }
);

const Periodic = mongoose.model("Periodic", PeriodicSchema);
module.exports = Periodic;
