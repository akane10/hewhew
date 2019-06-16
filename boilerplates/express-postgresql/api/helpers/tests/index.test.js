/* eslint-disable */
const { removeFalsy, validateEmail, parseUsername } = require('../index');

describe('test removeFalsy', () => {
  const data = {
    id: 1,
    username: 'name',
    age: null
  };
  test('remove falsy values', () => {
    expect(removeFalsy(data)).toEqual({ id: 1, username: 'name' });
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

test('test parseUsername', () => {
  const username = 'kibaAA*^&%%#';
  expect(parseUsername(username)).toBe('kibaaa');
});
