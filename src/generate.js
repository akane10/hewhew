const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const {
  editFile,
  editJson,
  filterQuestions,
  changeQuestions,
  createDirectory
} = require("./helpers");

const CURR_DIR = process.cwd();

async function generate(questions, chosenProject) {
  let projectChoice = "";
  try {
    const answers = await inquirer.prompt(questions);
    projectChoice = answers["project-choice"] || chosenProject;
    const projectName = answers["project-name"];

    const boilerplatePath = path.join(
      __dirname,
      "..",
      "boilerplates",
      `${projectChoice}`
    );

    const projectPath = path.join(CURR_DIR, projectName);
    fs.mkdirSync(projectPath);
    createDirectory(boilerplatePath, projectPath);

    const jsonFilePath = path.join(projectPath, "package.json");
    const stats = fs.existsSync(jsonFilePath);
    if (stats) {
      const editName = editJson({ name: projectName });
      editFile(jsonFilePath, editName);
    }

    console.log(`${projectName} has been created`);
    console.log(`cd ${projectName}`);
  } catch (e) {
    const { code: errCode } = e;

    if (errCode === "EEXIST") {
      const projectName = filterQuestions("name", "project-name");
      const message = changeQuestions(
        "message",
        "folder already exist, try with another project name"
      );
      const q = questions.filter(projectName).map(message);
      return generate(q, projectChoice);
    }
    console.log(e);
    process.exit(1);
  }
}

module.exports = generate;
