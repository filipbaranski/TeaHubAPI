const mongoose = require("mongoose");

const CalendarSchema = mongoose.Schema(
  {
    year: String,
    month: String,
    red: Array,
    is_cube: Array,
    userId: String,
  },
  { collection: "Calendar" }
);

const Calendar = mongoose.model("Calendar", CalendarSchema);
module.exports = Calendar;
