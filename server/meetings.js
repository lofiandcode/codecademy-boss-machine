const express = require('express');
const meetingsRouter = express.Router();

const {
    createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
} = require('./db');

meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = createMeeting();
    addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    const isAllDeleted = deleteAllFromDatabase('meetings');
    if (isAllDeleted) {
        res.status(204).send()
    } else {
        res.status(404).send();
    }
});

module.exports = meetingsRouter;