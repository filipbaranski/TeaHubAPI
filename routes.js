const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const authMiddleware = require('./middleware');

const userController = require('./controllers/user');
const datesController = require('./controllers/dates');
const calendarController = require('./controllers/calendar');

mongoose.connect(process.env.DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

router.post('/signin', userController.signIn);
router.get('/signout/:id', userController.signOut);

router.get('/dates/:userId', authMiddleware(), datesController.getDates);
router.post('/date', authMiddleware(), datesController.postDate);
router.delete('/date/:id', authMiddleware(), datesController.deleteDate);
router.patch('/date/:id', authMiddleware(), datesController.updateDate);

router.get('/calendar/:year/:month/:userId', authMiddleware(), calendarController.getCalendar);
router.patch('/calendar/:id', authMiddleware(), calendarController.updateCalendar);

module.exports = router;
