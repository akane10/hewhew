/*
  I recommend using ramda for FP library
*/

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

const log = (...args) => console.log(...args);

const composePromise = (...fns) => x => fns.reduceRight((y, f) => Promise.resolve(y).then(f), x);

const pipePromise = (...fns) => x => fns.reduce((y, f) => Promise.resolve(y).then(f), x);

const clone = items => items.map(item => (Array.isArray(item) ? clone(item) : item));

const curry = (f, arr = []) => (...args) =>
  (a => (a.length === f.length ? f(...a) : curry(f, a)))([...arr, ...args]);

const trace = label => value => {
  console.log(`${label} : ${value}`);
  return value;
};

module.exports = { pipe, compose, log, trace, composePromise, pipePromise, clone, curry };
