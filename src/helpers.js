const fs = require('fs');
const path = require('path');

const toJson = data => JSON.stringify(data, null, 2);

const joinPath = pathArg => path.join(`${__dirname}`, `${pathArg}`);

const editJson = newData => data => {
  const dataObj = JSON.parse(data);
  const dataMerged = Object.entries({ ...dataObj, ...newData });

  const notUndefined = ([key, val]) => val !== undefined;
  const toObj = (obj, item) => {
    obj[item[0]] = item[1];
    return obj;
  };

  const final = dataMerged.filter(notUndefined).reduce(toObj, {});
  return toJson(final);
};

function editFile(path, fn) {
  const data = fs.readFileSync(path, 'utf-8');
  const newData = fn(data);
  fs.writeFileSync(path, newData, 'utf-8');
}

module.exports = {
  editFile,
  editJson,
  toJson,
  joinPath
};
