const inquirer = require('inquirer');
const fs = require('fs');
const {
  editFile,
  editJson,
  joinPath,
  filterQuestions,
  changeQuestions,
  createDirectory
} = require('./helpers');

const CURR_DIR = process.cwd();

async function generate(questions, chosenProject) {
  let projectChoice = '';
  try {
    const answers = await inquirer.prompt(questions);
    projectChoice = answers['project-choice'] || chosenProject;
    const projectName = answers['project-name'];

    const boilerplatePath = joinPath(`../boilerplates/${projectChoice}`);
    const projectPath = `${CURR_DIR}/${projectName}`;
    fs.mkdirSync(projectPath);
    createDirectory(boilerplatePath, projectPath);

    const jsonFilePath = `${projectPath}/package.json`;
    const stats = fs.existsSync(jsonFilePath);
    if (stats) {
      const editName = editJson({ name: projectName });
      editFile(jsonFilePath, editName);
    }
  } catch (e) {
    const errCode = e.code;

    if (errCode === 'EEXIST') {
      const projectName = filterQuestions('name', 'project-name');
      const message = changeQuestions(
        'message',
        'folder already exist, try with another project name'
      );
      const q = questions.filter(projectName).map(message);
      return generate(q, projectChoice);
    }
    console.log(e);
    process.exit(1);
  }
}

module.exports = generate;
