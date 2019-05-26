const { Article } = require('../../../models');
const { sendData } = require('../../../helpers/index');

async function create(req, res, next) {
  const { author, title, content, categories } = req.body;

  try {
    await Article.sync({ force: true });
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
