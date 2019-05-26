const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const api = require('./api/index');
const { sendData } = require('./api/helpers/index');

app.use('/api', api);

// MIDDLEWARE WHEN HITTING ROUTE THAT DOESN'T EXIST
app.use((req, res) => {
  res.status(404).send(sendData.fail('route not found'));
});

// MIDDLEWARE FOR HANDLING ERROR
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { message, status } = err;
  res.status(status || 500).send(sendData.fail(message));
  process.exitCode = 1; // exit process when an error occur
});

module.exports = app;
