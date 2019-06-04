const { editJson, changeQuestions } = require('../src/helpers');
const { defaultDataTest } = require('./data');

describe.each(defaultDataTest)(
  'test editJson',
  (valueTest, behavior, expected) => {
    test(`${behavior}`, () => {
      expect(editJson(valueTest.newOne)(valueTest.oldOne)).toBe(expected);
    });
  }
);

describe('test changeQuestions', () => {
  const QUESTIONS = [
    {
      name: 'project-choice',
      type: 'list',
      message: 'What project boilerplate would you like to generate?'
    }
  ];

  const message = changeQuestions(
    'message',
    'What project boilerplate would you like to delete?'
  );

  const fn = QUESTIONS.map(message);
  test('success', () => {
    expect(fn).toStrictEqual([
      {
        name: 'project-choice',
        type: 'list',
        message: 'What project boilerplate would you like to delete?'
      }
    ]);
  });

  test(`should be pure`, () => {
    expect(QUESTIONS[0].message).toBe(
      'What project boilerplate would you like to generate?'
    );
  });
});
