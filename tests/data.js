const { toJson } = require('../helpers');

const objData = {
  oldOne: toJson({
    id: 1,
    name: 'akane',
    mood: 'happy'
  }),
  newOne: {
    id: 2,
    name: 'kiba',
    gender: 'female',
    phone: null,
    age: undefined,
    hobby: 0
  }
};

const result = objData => {
  const data = toJson({ ...objData.newOne, mood: 'happy' });
  delete data.age;
  return data;
};

const expected = result(objData);

const defaultDataTest = [
  // [value test, behavior, expected]
  [objData, 'should success', expected],
  [objData, 'should not remove null value', expected],
  [objData, 'should remove undefined value', expected],
  [objData, 'should not remove 0 value', expected]
];

module.exports = { defaultDataTest };
