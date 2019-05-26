const { editFile, editJson } = require('../helpers');
const { defaultDataTest } = require('./data');
const fs = require('fs');

describe.skip.each(defaultDataTest)(
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

const path = 'tests/sample/package.json';
const data = fs.readFileSync(path, 'utf-8');
const editFileData = [
  // [value test, behavior, expected]
  [path, 'should success', data]
];

describe.each(editFileData)(
  'test editFile',
  (valueTest, behavior, expected) => {
    test(`${behavior}`, () => {
      expect(editFile(valueTest, editJson({ name: 'projectName' }))).toBe(
        expected
      );
    });
  }
);
