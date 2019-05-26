const mongoose = require('mongoose');
const { dbuser, dbpassword } = require('./config');

const options = { useNewUrlParser: true };

const uri = `mongodb://${dbuser}:${dbpassword}`;

const dbConn = {
  connectDB() {
    mongoose.Promise = Promise;
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.connect(uri, options, () => console.log('db connected')).catch(console.log);
  },
  disconnectDB() {
    mongoose.disconnect(() => console.log('db disconnected'));
  }
};

module.exports = { dbConn };
