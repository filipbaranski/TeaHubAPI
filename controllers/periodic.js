const Periodic = require("../models/Periodic");

const getPeriodic = async (req, res) => {
  const periodic = await Periodic.find({ userId: req.params.userId });
  try {
    res.send(periodic);
  } catch (err) {
    res.status(500).send(err);
  }
};

const postPeriodic = async (req, res) => {
  const periodic = new Periodic(req.body);
  try {
    await periodic.save();
    res.send(periodic);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deletePeriodic = async (req, res) => {
  try {
    const periodic = await Periodic.findByIdAndDelete(req.params.id);

    if (!periodic) res.status(404).send("No item found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

const updatePeriodic = async (req, res) => {
  try {
    await Periodic.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getPeriodic,
  postPeriodic,
  deletePeriodic,
  updatePeriodic,
};
