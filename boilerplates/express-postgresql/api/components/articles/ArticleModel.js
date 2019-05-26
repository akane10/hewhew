const { db, Sequelize } = require('../../../config/db');

const Article = db.define('article', {
  title: {
    allowNull: false,
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  isPublish: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
});

module.exports = Article;
