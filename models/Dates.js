const mongoose = require('mongoose');

const DateSchema = mongoose.Schema({
    day: String,
    month: String,
    year: String,
    event: String,
    userId: String,
}, { collection : 'Dates' });

const Dates = mongoose.model('Dates', DateSchema);
module.exports = Dates;
