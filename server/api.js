const express = require('express');
const apiRouter = express.Router();
const morgan = require('morgan');

apiRouter.use(morgan('tiny'));

//Mount existing minionsRouter at the '/minions' path
const minionsRouter = require('./minions');
apiRouter.use('/minions', minionsRouter);

//Mount existing ideasRouter at the '/ideas' path
const ideasRouter = require('./ideas');
apiRouter.use('/ideas', ideasRouter);

module.exports = apiRouter;
