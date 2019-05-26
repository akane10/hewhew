/*
const jwt = require('jsonwebtoken');
const { key } = require('../../config/config');
const {sendData} = require('../helpers/sendData');

function verifyToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).send(sendData.fail('no token provide'));
  const token = authorization.replace('Bearer ', '');

  // verifies secret and checks exp
  return jwt.verify(token, key, (err, decoded) => {
    if (err) return res.status(403).send(sendData.fail('failed to authenticate token'));

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    return next();
  });
}

module.exports = verifyToken;
*/
