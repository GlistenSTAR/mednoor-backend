const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePatientInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'FirstName field required';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'LastName field required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
