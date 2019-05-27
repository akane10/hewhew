const inquirer = require('inquirer');
const fs = require('fs');
const { joinPath, filterQuestions, changeQuestions } = require('./helpers');

async function deleteBoilerplate(questions) {
  try {
    const projectChoice1 = filterQuestions('name', 'project-choice');
    const message = changeQuestions(
      'message',
      'What project boilerplate would you like to delete?'
    );
    const q = questions.filter(projectChoice1).map(message);
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
