const Calendar = require('../models/Calendar');

const getCalendar = async (req, res) => {
    const calendar = await Calendar.findOne({
        year: req.params.year,
        month: req.params.month,
        userId: req.params.userId,
    });
    try {
        if (calendar !== null) {
            res.send(calendar)
        }
        if (calendar === null) {
            postCalendar({
                year: req.params.year,
                month: req.params.month,
                userId: req.params.userId,
            }, res)
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

const postCalendar = async (payload, res) => {
    const calendar = new Calendar(payload);
    try {
        await calendar.save();
        res.send(calendar);
    } catch (err) {
        res.status(500).send(err);
    }
};

const updateCalendar = async (req, res) => {
    try {
        await Calendar.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send();
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    getCalendar,
    postCalendar,
    updateCalendar,
};
