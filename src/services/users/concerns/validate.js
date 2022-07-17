const errors = require('@feathersjs/errors');

const validate = (context) => {
  const { data } = context;
  
  if (!data.email) {
    throw new errors.BadRequest('email required'); // developer's fault
  }

  if (!data.password) {
    throw new errors.BadRequest('password required'); // developer's fault
  }
  return context;
};

module.exports = validate;
