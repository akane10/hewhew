#!/usr/bin/env node

const fs = require('fs');
const generate = require('./src/generate');
const add = require('./src/add');

const CHOICES = fs.readdirSync(`${__dirname}/boilerplates`);
const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'What project boilerplate would you like to generate?',
    choices: CHOICES
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function(input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];

(function() {
  const ARGS = process.argv;

  if (ARGS[2] === 'generate') {
    return generate(QUESTIONS);
  } else if (ARGS[2] === 'add') {
    // const name = ARGS[3];
    // console.log(name);
    const q = QUESTIONS.filter(i => i.name === 'project-name');
    return add(q);
  }
})();
