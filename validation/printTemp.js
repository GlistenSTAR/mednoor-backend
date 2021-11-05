const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePrintDataInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.tempName = !isEmpty(data.tempName) ? data.tempName : '';

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
