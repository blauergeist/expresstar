const Validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = function validateOrderInput(data) {
  let errors = {};
  //rec in front of field names stands for "recipient" - done so that the data of recipient doesn't get confused for the data of the sender
  data.recName = !isEmpty(data.recName) ? data.recName : "";
  data.recCity = !isEmpty(data.recCity) ? data.recCity : "";
  data.recStreet = !isEmpty(data.recStreet) ? data.recStreet : "";
  data.recStreetnumber = !isEmpty(data.recStreetnumber)
    ? data.recStreetnumber
    : "";
  data.recZipcode = !isEmpty(data.recZipcode) ? data.recZipcode : "";
  data.recPhone = !isEmpty(data.recPhone) ? data.recPhone : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  //recipient location validation
  if (Validator.isEmpty(data.recCity)) {
    errors.location = "Recipient's city required";
  }

  if (Validator.isEmpty(data.recStreet)) {
    errors.location = "Recipient's street required";
  }

  if (Validator.isEmpty(data.recStreetnumber)) {
    errors.location = "Recipient's street number required";
  }

  if (Validator.isEmpty(data.recZipcode)) {
    errors.location = "Recipient's zip code required";
  }

  if (Validator.isEmpty(data.recPhone)) {
    errors.location = "Recipient's phone number required";
  }

  if (!Validator.isMobilePhone(data.recPhone)) {
    errors.phone = "Recipient - Invalid phone number format";
  }

  if (!Validator.isLength(data.recPhone, { min: 6, max: 32 })) {
    errors.phone =
      "Recipient's phone number must consist of minimum 6 characters";
  }
  //order description validation
  if (!Validator.isLength(data.description, { min: 10, max: 350 })) {
    errors.description = "Description must be between 10 and 350 characters";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Order description required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
