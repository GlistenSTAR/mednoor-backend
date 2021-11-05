const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSearchKeyInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.date = !isEmpty(data.date) ? data.date : '';

  if (Validator.isEmpty(data.firstName) && Validator.isEmpty(data.lastName) && Validator.isEmpty(data.date)) {
    errors.errMsg = 'Please enter search keys!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
