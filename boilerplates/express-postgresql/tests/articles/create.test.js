const supertest = require('supertest');

const app = require('../../app');
const request = supertest(app);
const { articleData, Bearer } = require('../data');

describe.skip('test create article', () => {
  describe('test /articles/create', () => {
    test('create article', done => {
      request
        .post('/api/articles/create')
        .send(articleData)
        // .set('Authorization', Bearer)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(res => {
          // console.log('success case :', res.body);
          expect(res.body.success).toBe(true);
        })
        .expect(200, done);
    });
  });
});
