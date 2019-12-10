const inquirer = require("inquirer");
const fs = require("fs");
const rimraf = require("rimraf");
const path = require("path");
const { filterQuestions, changeQuestions } = require("./helpers");

const projectChoice1 = filterQuestions("name", "project-choice");
const message = changeQuestions(
  "message",
  "What project boilerplate would you like to delete?"
);

async function deleteBoilerplate(questions) {
  try {
    const q = questions.filter(projectChoice1).map(message);
    const answers = await inquirer.prompt(q);
    const projectChoice = answers["project-choice"];

    if (
      projectChoice === "express-postgresql" ||
      projectChoice === "express-mongodb"
    )
      return console.log("cannot delete default boilerplate");

    const boilerplatePath = path.join(
      __dirname,
      "..",
      "boilerplates",
      projectChoice
    );

    if (fs.existsSync(boilerplatePath)) {
      rimraf(boilerplatePath, function() {
        console.log("Boilerplate has been deleted");
      });
    } else {
      console.log("cannot find the boilerplate");
      process.exit(1);
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

module.exports = deleteBoilerplate;
