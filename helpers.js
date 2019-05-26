const fs = require('fs');

const toJson = data => JSON.stringify(data, null, 2);

const editJson = newData => data => {
  const dataParsed = JSON.parse(data);
  const newDataArr = Object.entries(newData);
  const oldDataArr = Object.entries(dataParsed);

  const obj = {};
  oldDataArr.forEach(([oldKey, oldValue]) => {
    newDataArr.forEach(([newKey, newValue]) => {
      if (oldValue === newValue || newKey || newValue === null) {
        obj[newKey] = newValue;
      }
      obj[oldKey] = oldValue;
    });
  });

  return toJson(obj);
};

function editFile(path, fn) {
  const data = fs.readFileSync(path, 'utf-8');
  const newData = fn(data);
  fs.writeFileSync(path, newData, 'utf-8');
}

module.exports = {
  editFile,
  editJson,
  toJson
};
