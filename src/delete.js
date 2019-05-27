const inquirer = require('inquirer');
const fs = require('fs');
const { joinPath } = require('./helpers');

const projectChoice1 = x => x.name === 'project-choice';

async function deleteBoilerplate(questions) {
  try {
    const q = questions.filter(projectChoice1);
    const answers = await inquirer.prompt(q);
    const projectChoice = answers['project-choice'];

    const boilerplatePath = joinPath(`../boilerplates/${projectChoice}`);

    if (fs.existsSync(boilerplatePath)) {
      const rimraf = require('rimraf');
      rimraf(boilerplatePath, function() {
        console.log('Boilerplate has been deleted');
      });
    } else {
      console.log('no folder found');
      process.exit(1);
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

module.exports = deleteBoilerplate;
