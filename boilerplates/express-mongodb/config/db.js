const mongoose = require('mongoose');
const { dbuser, dbpassword } = require('./config');
const options = { useNewUrlParser: true };

const uri = `uri${dbuser}/${dbpassword}`;
// mongoose.Promise = global.Promise;
mongoose.set('debug', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(uri, options, err => {
  if (err) return console.log(err.message);
  console.log('db connected');
});
