import { body } from "express-validator";

export const validateRegisterInput = [
  body("username")
    .isString()
    .notEmpty()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Must be a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    .withMessage(
      "Password must be at least 6 characters and contain both letters and numbers"
    ),
];

export const validateLoginInput = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Must be a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];
