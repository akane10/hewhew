const fs = require("fs");
const path = require("path");

const toJson = data => JSON.stringify(data, null, 2);
const filterQuestions = (key, val) => i => i[key] === val;
const changeQuestions = (key, val) => i => ({ ...i, [key]: val });

const editJson = newData => data => {
  const dataObj = JSON.parse(data);
  const dataMerged = Object.entries({ ...dataObj, ...newData });

  const notUndefined = ([, val]) => val !== undefined;
  const toObj = (obj, item) => {
    const [key, val] = item;
    obj[key] = val;
    return obj;
  };

  const final = dataMerged.filter(notUndefined).reduce(toObj, {});
  return toJson(final);
};

function editFile(path, fn) {
  const data = fs.readFileSync(path, "utf-8");
  const newData = fn(data);
  fs.writeFileSync(path, newData, "utf-8");
}

function createDirectory(fromPath, toPath) {
  const filesToCreate = fs.readdirSync(fromPath);

  filesToCreate.forEach(file => {
    if (file === ".git") return;

    const origFilePath = path.join(fromPath, file);
    const stats = fs.statSync(origFilePath);
    const writePath = path.join(toPath, file);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, "utf8");

      fs.writeFileSync(writePath, contents, "utf8");
    }

    if (stats.isDirectory()) {
      if (file === "node_modules") return;

      fs.mkdirSync(writePath);
      createDirectory(origFilePath, writePath);
    }
  });
}

module.exports = {
  editFile,
  editJson,
  toJson,
  filterQuestions,
  changeQuestions,
  createDirectory
};
