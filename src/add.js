const inquirer = require('inquirer');
const fs = require('fs');
const {
  joinPath,
  filterQuestions,
  changeQuestions,
  createDirectory
} = require('./helpers');

const CURR_DIR = process.cwd();
const projectName = filterQuestions('name', 'project-name');

async function add(questions) {
  try {
    const q = questions.filter(projectName);
    const answers = await inquirer.prompt(q);
    const boilerplateName = answers['project-name'];

    const boilerplatePath = joinPath(`../boilerplates/${boilerplateName}`);
    fs.mkdirSync(boilerplatePath);

    createDirectory(CURR_DIR, boilerplatePath);
  } catch (e) {
    const errCode = e.code;

    if (errCode === 'EEXIST') {
      const message = changeQuestions(
        'message',
        'folder already exist, try with another project name'
      );
      const q = questions.filter(projectName).map(message);
      return add(q);
    }
    console.log(e);
    process.exit(1);
  }
}

module.exports = add;
