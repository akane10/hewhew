/* eslint-disable */
const { parseData, validateEmail } = require('../index');

describe('test parseData', () => {
  const data = {
    id: 1,
    username: 'name',
    age: null
  };
  test('remove falsy values', () => {
    expect(parseData(data)).toEqual({ id: 1, username: 'name' });
  });
});

describe('test validateEmail', () => {
  const email = 'emai@email.com';
  const notEmail = 'emailemail.com';
  test('return true', () => {
    expect(validateEmail(email)).toBe(true);
  });

  test('return false', () => {
    expect(validateEmail(notEmail)).toBe(false);
  });
});
