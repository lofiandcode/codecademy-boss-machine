const express =require('express');
const ideasRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const foundIdea = getFromDatabaseById('ideas', id);
    if (foundIdea) {
        req.idea = foundIdea;
        next();
    } else {
        res.status(404).send();
    };
});

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
})

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const isDeleted = deleteFromDatabasebyId('ideas', req.idea.id);
    if (isDeleted) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});

module.exports = ideasRouter;