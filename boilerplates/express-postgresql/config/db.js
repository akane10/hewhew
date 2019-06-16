const Sequelize = require('sequelize');
const { dbname, dbuser, dbpassword } = require('./config');

const db = new Sequelize(dbname, dbuser, dbpassword, {
  host: 'localhost',
  dialect: 'postgres',
  omitNull: true,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const dbConn = {
  connectDB() {
    db.authenticate()
      .then(() => {
        console.log('db is connected');
      })
      .catch(err => {
        console.error('Unable to connect to the databse:', err);
      });
  },
  disconnectDB() {
    db.connectionManager.close().catch(e => console.log(e));
  }
};

module.exports = { db, Sequelize, dbConn };
