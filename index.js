#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const { editFile, editJson } = require('./helpers');

const CURR_DIR = process.cwd();

async function doIt(questions, chosenProject) {
  let projectChoice = '';
  try {
    const answers = await inquirer.prompt(questions);
    projectChoice = answers['project-choice'] || chosenProject;
    const projectName = answers['project-name'];

    const boilerplatePath = `${__dirname}/boilerplates/${projectChoice}`;

    const currentProjectPath = `${CURR_DIR}/${projectName}`;
    fs.mkdirSync(currentProjectPath);
    createDirectoryContents(boilerplatePath, projectName);

    const editName = editJson({ name: projectName });
    editFile(`${currentProjectPath}/package.json`, editName);
  } catch (e) {
    const errCode = e.code;

    const q = questions
      .filter(i => i.name === 'project-name')
      .map(i => {
        i.message = `folder already exist, try with another project name`;
        return i;
      });

    if (errCode === 'EEXIST') {
      return doIt(q, projectChoice);
    }
    console.log(e);
    process.exit(1);
  }
}

function createDirectoryContents(boilerplatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(boilerplatePath);

  filesToCreate.forEach(file => {
    if (file === 'README.md') return;

    const origFilePath = `${boilerplatePath}/${file}`;

    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      createDirectoryContents(
        `${boilerplatePath}/${file}`,
        `${newProjectPath}/${file}`
      );
    }
  });
}

(function() {
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

  doIt(QUESTIONS);
})();
