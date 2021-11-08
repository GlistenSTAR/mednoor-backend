const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateModelDataInput(data) {
  let errors = {};

  data.modelName = !isEmpty(data.modelName) ? data.modelName : '';
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';

  if (Validator.isEmpty(data.modelName)) {
    errors.modelName = 'Please input the model name';
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'Firstname field required';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Lastname field required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
