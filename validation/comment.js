const Validator = require("validator");
import isEmpty from "./is-empty";

module.exports = function validateCommentInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  //comment text validation
  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Comment text must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
