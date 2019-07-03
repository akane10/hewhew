#!/usr/bin/env node

const fs = require('fs');
const generate = require('./src/generate');
const add = require('./src/add');
const deleteBoilerplate = require('./src/delete');

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
  const arg = ARGS[2];

  if (arg === 'generate') return generate(QUESTIONS);

  if (arg === 'add') return add(QUESTIONS);

  if (arg === 'delete') return deleteBoilerplate(QUESTIONS);

  console.log('oopss unknown command!!');
  console.log('available commands are: "generate", "add", "delete"');
  process.exit(1);
})();
