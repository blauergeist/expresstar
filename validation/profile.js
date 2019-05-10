const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.street = !isEmpty(data.street) ? data.street : "";
  data.streetnumber = !isEmpty(data.streetnumber) ? data.streetnumber : "";
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";

  //location validation
  if (Validator.isEmpty(data.city)) {
    errors.location = "City required";
  }

  if (Validator.isEmpty(data.street)) {
    errors.location = "Street required";
  }

  if (Validator.isEmpty(data.streetnumber)) {
    errors.location = "Street number required";
  }

  if (Validator.isEmpty(data.zipcode)) {
    errors.location = "Zip code required";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.location = "Phone number required";
  }

  if (!Validator.isMobilePhone(data.phone)) {
    errors.phone = "Invalid phone number format";
  }

  if (!Validator.isLength(data.phone, { min: 6, max: 32 })) {
    errors.phone = "Phone number must consist of minimum 6 characters";
  }

  //handle validation
  if (!Validator.isLength(data.handle, { min: 2, max: 16 })) {
    errors.handle = "Handle must contain 2 to 16 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle required";
  }

  // unrequired social network validations
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Invalid URL";
    }
  }

  if (!isEmpty(data.olx)) {
    if (!Validator.isURL(data.olx)) {
      errors.olx = "Invalid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Invalid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Invalid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
