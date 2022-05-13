const express = require('express');
const minionsRouter = express.Router();
const db = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    try {
        const foundMinion = db.getFromDatabaseById('minions', id);
        if (foundMinion === undefined) {
            const err = new Error('The minion you are looking for could not be found.');
            err.status = 404;
            next(err);
        } else {
            req.minion = foundMinion;
            next();
        };
    } catch (err) {
        next(err);
    }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('minions'));
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = db.addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = db.updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
})

//Error Handler
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    console.log(err.message);
    res.status(status).send(err.message);
};

minionsRouter.use(errorHandler);

module.exports = minionsRouter;