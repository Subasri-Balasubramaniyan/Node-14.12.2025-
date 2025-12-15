/* validation and sanitization */

const { body } = require("express-validator");

exports.registerValidator = [
  body("name")
    .trim()                 // remove extra spaces
    .notEmpty().withMessage("Name is required")
    .escape(),              // sanitize HTML

  body("email")
    .isEmail().withMessage("Invalid email")
    .normalizeEmail(),      // clean email

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
