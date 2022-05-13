const express = require('express');
const minionsRouter = express.Router();
const db = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    try {
        const foundMinion = db.getFromDatabaseById('minions', id);
        if (foundMinion === undefined) {
            next(new Error('The minion you are looking for could not be found.'));
        } else {
            console.log('In else')
            req.minion = foundMinion;
            next();
        };
    } catch (err) {
        next(err);
    }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('minions'));
})

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
})

//Error Handler
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    console.log(err.message);
    res.status(status).send(err.message);
}

minionsRouter.use(errorHandler);

module.exports = minionsRouter;