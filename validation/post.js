const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
  let errors = {}

  data.text = !isEmpty(data.text) ? data.text : ''

  if (!Validator.isLength(data.text, { min: 1 })) {
    errors.text = 'Post must be more than 1 character'
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
