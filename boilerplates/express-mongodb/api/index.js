const router = require('express').Router();

// const verifyToken = require("./polices/verifyToken");

const articles = require('./components/articles/index');

router.use('/articles', articles);

module.exports = router;
