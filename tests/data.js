const { toJson } = require('../helpers');

// editJson data
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

const result = toJson({
  id: 2,
  name: 'kiba',
  mood: 'happy',
  gender: 'female',
  phone: null,
  hobby: 0
});

const expected = result;

const defaultDataTest = [
  // [value test, behavior, expected]
  [objData, 'should success', expected],
  [objData, 'should not remove null value', expected],
  [objData, 'should remove undefined value', expected],
  [objData, 'should not remove 0 value', expected]
];

module.exports = { defaultDataTest };
