// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  dbuser: process.env.DBUSER,
  dbpassword: process.env.DBPASSWORD,
  secretkey: process.env.SECRETKEY
};
