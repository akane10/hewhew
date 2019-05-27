const inquirer = require('inquirer');
const fs = require('fs');
const { joinPath, filterQuestions, changeQuestions } = require('./helpers');

const CURR_DIR = process.cwd();
const projectName = filterQuestions('name', 'project-name');

async function add(questions) {
  try {
    const q = questions.filter(projectName);
    const answers = await inquirer.prompt(q);
    const boilerplateName = answers['project-name'];

    const boilerplatePath = joinPath(`../boilerplates/${boilerplateName}`);
    fs.mkdirSync(boilerplatePath);

    createDirectoryContentsAdd(CURR_DIR, boilerplatePath);
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

function createDirectoryContentsAdd(CURR_DIR, boilerplatePath) {
  const filesToCreate = fs.readdirSync(CURR_DIR);

  filesToCreate.forEach(file => {
    const origFilePath = `${CURR_DIR}/${file}`;
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');

      const writePath = `${boilerplatePath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    }

    if (stats.isDirectory()) {
      if (file === 'node_modules') return;

      fs.mkdirSync(`${boilerplatePath}/${file}`);

      createDirectoryContentsAdd(
        `${CURR_DIR}/${file}`,
        `${boilerplatePath}/${file}`
      );
    }
  });
}

module.exports = add;
