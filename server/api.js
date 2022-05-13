const express = require('express');
const apiRouter = express.Router();

//Mount existing minionsRouter at the '/minions' path
const minionsRouter = require('./minions');
apiRouter.use('/minions', minionsRouter);


module.exports = apiRouter;
