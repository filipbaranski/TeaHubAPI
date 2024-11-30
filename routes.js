const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const authMiddleware = require("./middleware");

const userController = require("./controllers/user");
const datesController = require("./controllers/dates");
const periodicController = require("./controllers/periodic");
const calendarController = require("./controllers/calendar");

mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

router.post("/signin", userController.signIn);
router.get("/signout/:id", userController.signOut);

router.get("/dates/:userId", authMiddleware(), datesController.getDates);
router.post("/date", authMiddleware(), datesController.postDate);
router.delete("/date/:id", authMiddleware(), datesController.deleteDate);
router.patch("/date/:id", authMiddleware(), datesController.updateDate);

router.get(
  "/periodic/:userId",
  authMiddleware(),
  periodicController.getPeriodic
);
router.post("/periodic", authMiddleware(), periodicController.postPeriodic);
router.delete(
  "/periodic/:id",
  authMiddleware(),
  periodicController.deletePeriodic
);
router.patch(
  "/periodic/:id",
  authMiddleware(),
  periodicController.updatePeriodic
);

router.get(
  "/calendar/:year/:month/:userId",
  authMiddleware(),
  calendarController.getCalendar
);
router.patch(
  "/calendar/:id",
  authMiddleware(),
  calendarController.updateCalendar
);

module.exports = router;
