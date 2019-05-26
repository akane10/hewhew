const router = require('express').Router();

const create = require('./controller/create');

router.post('/create', create);

module.exports = router;
