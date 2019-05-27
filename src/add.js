const inquirer = require('inquirer');
const fs = require('fs');
const { joinPath } = require('./helpers');

const CURR_DIR = process.cwd();

async function add(questions) {
  const answers = await inquirer.prompt(questions);
  const boilerplateName = answers['project-name'];

  const boilerplatePath = joinPath(`../boilerplates/${boilerplateName}`);
  fs.mkdirSync(boilerplatePath);

  createDirectoryContentsAdd(CURR_DIR, boilerplatePath);
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
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${boilerplatePath}/${file}`);

      createDirectoryContentsAdd(
        `${CURR_DIR}/${file}`,
        `${boilerplatePath}/${file}`
      );
    }
  });
}

module.exports = add;
