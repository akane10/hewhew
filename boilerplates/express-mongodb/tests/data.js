const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
const Bearer = `Bearer ${token}`;

const articleData = {
  title: 'this is a title',
  content: 'this is a content',
  categories: ['education']
};

module.exports = { articleData, Bearer };
