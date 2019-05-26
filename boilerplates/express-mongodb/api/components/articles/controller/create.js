const Article = require('./ArticleModel');
const { sendData } = require('../../../helpers/index');

async function create(req, res, next) {
  const { author, title, content, categories } = req.body;

  try {
    const article = await Article.create({
      author,
      title,
      content,
      categories
    });

    return res.send(sendData.success(article));
  } catch (err) {
    err.status = 400;
    return next(err);
  }
}

module.exports = create;
