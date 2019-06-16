// sequelize thing
function removePassword(arg) {
  const v = arg;
  // eslint-disable-next-line func-names
  v.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };
}

// validateEmail :: String -> Bool
function validateEmail(email) {
  // eslint-disable-next-line
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regEx.test(email);
}

// removeFalsy :: Obj -> Obj
function removeFalsy(obj) {
  const truthyValue = ([, val]) => val;

  const data = Object.entries(obj)
    .filter(truthyValue)
    .reduce(toObj, {});

  return data;
}

const parseUsername = username =>
  username
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '')
    .trim();

function errHandler(msg, status) {
  const err = new Error(msg);
  err.status = status || null;
  return err;
}

const sendData = {
  success(arg, custom) {
    const data = {
      success: true,
      results: arg
    };
    return { ...data, ...custom };
  },
  fail(arg, custom) {
    const data = {
      success: false,
      results: arg
    };
    return { ...data, ...custom };
  }
};

module.exports = {
  removePassword,
  validateEmail,
  removeFalsy,
  errHandler,
  sendData,
  parseUsername
};
