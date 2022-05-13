const express = require('express');
const meetingsRouter = express.Router();
const db = require('./db');

meetingsRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = db.createMeeting();
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    const isAllDeleted = db.deleteAllFromDatabase('meetings');
    if (isAllDeleted === []) {
        res.status(204).send()
    } else {
        const err = new Error('The model type passed in this request does not exist in the database.');
        err.status = 404;
        next(err);
    }
});

//Error Handler
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    console.log(err.message);
    res.status(status).send(err.message);
};

meetingsRouter.use(errorHandler);

module.exports = meetingsRouter;