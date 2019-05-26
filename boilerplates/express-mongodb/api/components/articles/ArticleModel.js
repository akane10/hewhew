const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  categories: {
    type: Array,
    required: true
  }
});

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
