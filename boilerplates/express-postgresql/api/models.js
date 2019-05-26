const Article = require('./components/articles/ArticleModel');

/**
 * ASSOCIATION GOES HERE
 * 
 *  @example
 * 
 *  User.hasMany(Article, {
 *    as: 'articles',
 *    foreignKey: 'author',
 *    onDelete: 'cascade'
 *  })
 */

module.exports = {
  Article
};
