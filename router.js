const express = require('express');
const router = express.Router();
const routeParser = require('./middlewares/route.parser');
const authorization = require('./middlewares/authorization');

router.post('/user/*', routeParser);
router.all('/*',authorization.validate, routeParser);


module.exports = router;
