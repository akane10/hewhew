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
  const [_, __, command] = process.argv;

  if (command === 'generate') return generate(QUESTIONS);

  if (command === 'add') return add(QUESTIONS);

  if (command === 'delete') return deleteBoilerplate(QUESTIONS);

  console.log('oopss unknown command!!');
  console.log('available commands are: "generate", "add", "delete"');
  process.exit(1);
})();
