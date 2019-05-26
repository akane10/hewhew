function removePassword(arg) {
  const v = arg;
  // eslint-disable-next-line func-names
  v.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };
}

function validateEmail(email) {
  // eslint-disable-next-line
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return regEx.test(email)
}

function parseData(obj) {
  const data = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value) {
      data[key] = value;
    }
  });
  return data;
}

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
    const all = { ...data, ...custom };
    return all;
  },
  fail(arg, custom) {
    const data = {
      success: false,
      results: arg
    };
    const all = { ...data, ...custom };
    return all;
  }
};

module.exports = { removePassword, validateEmail, parseData, errHandler, sendData };
