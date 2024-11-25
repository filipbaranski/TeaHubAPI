const Dates = require('../models/Dates');

const getDates = async (req, res) => {
    const dates = await Dates.find({ userId: req.params.userId });
    try {
        res.send(dates);
    } catch (err) {
        res.status(500).send(err);
    }
};

const postDate = async (req, res) => {
    const date = new Dates(req.body);
    try {
        await date.save();
        res.send(date);
    } catch (err) {
        res.status(500).send(err);
    }
};

const deleteDate = async (req, res) => {
    try {
        const date = await Dates.findByIdAndDelete(req.params.id)
    
        if (!date) res.status(404).send("No item found");
        res.status(200).send();
    } catch (err) {
        res.status(500).send(err);
    }
};

const updateDate = async (req, res) => {
    try {
        await Dates.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send();
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    getDates,
    postDate,
    deleteDate,
    updateDate,
};
