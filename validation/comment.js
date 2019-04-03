const Validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = function validateCommentInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  //comment text validation
  if (!Validator.isLength(data.text, { min: 6, max: 32 })) {
    errors.text = "Comment text must consist of minimum 6 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
