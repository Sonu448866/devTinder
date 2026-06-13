const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not Valid");
  } else if (firstName.length < 2 || firstName.length > 50) {
    throw new Error("First name should be 4-50 characters");
  } else if (lastName.length < 2 || lastName.length > 50) {
    throw new Error("Last name should be 4-50 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not Valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
};

module.exports = {
  validateSignUpData: validateSignUpData,
};
