const express =require('express');
const ideasRouter = express.Router();
const db = require('./db');

ideasRouter.param('ideaId', (req, res, next, id) => {
    try {
        const foundIdea = db.getFromDatabaseById('ideas', id);
        if (foundIdea === undefined) {
            const err = new Error('The idea you are looking for could not be found.');
            err.status = 404;
            next(err);
        } else {
            req.idea = foundIdea;
            next();
        };
    } catch (err) {
        next(err);
    }
});

ideasRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('ideas'));
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
})

ideasRouter.post('/', (req, res, next) => {
    const newIdea = db.addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    const updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const isDeleted = db.deleteFromDatabasebyId('ideas', req.idea.id);
    if (isDeleted) {
        res.status(204).send();
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

ideasRouter.use(errorHandler);

module.exports = ideasRouter;