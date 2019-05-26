const { editJson } = require('../helpers');
const { defaultDataTest } = require('./data');

describe.each(defaultDataTest)(
  'test editJson',
  (valueTest, behavior, expected) => {
    test(`${behavior}`, () => {
      expect(editJson(valueTest.newOne)(valueTest.oldOne)).toBe(expected);
    });
    test(`should be pure`, () => {
      expect(valueTest).toBe(valueTest);
    });
  }
);
