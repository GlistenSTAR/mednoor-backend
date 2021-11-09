const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateModelDataInput(data) {
  let errors = {};

  data.modelName = !isEmpty(data.modelName) ? data.modelName : '';

  if (Validator.isEmpty(data.modelName)) {
    errors.modelName = 'Please input the model name';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
