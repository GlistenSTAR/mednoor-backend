const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUpdateInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'FirstName field required';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'LastName field required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid Email';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
