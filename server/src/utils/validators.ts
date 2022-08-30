import { check } from "express-validator";
import User from "../model/user";

export const validateSignIn = function () {
  return [
    check("email").isEmail().withMessage("You have entered an invalid email"),
    check("password")
      .isLength({
        min: 8,
      })
      .withMessage("Password must have at least 8 characters"),
  ];
};

export const validateSignUp = function () {
  return [
    check("firstName")
      .isLength({ min: 3, max: 12 })
      .withMessage(
        "First name must have a min and max length of 3-12 characters"
      )
      .matches(/^[A-Za-z0-9\s]+$/)
      .withMessage("First name must be alphanumeric"),
    check("lastName")
      .isLength({ min: 3, max: 12 })
      .withMessage(
        "Last name must have a min and max length of 3-12 characters"
      )
      .matches(/^[A-Za-z0-9\s]+$/)
      .withMessage("Last name must be alphanumeric"),
    check("email")
      .isEmail()
      .withMessage("You have entered an invalid email")
      .custom((email) =>
        User.findOne({ email }).then((user) => {
          if (user) return Promise.reject(new Error("Email is already taken"));
        })
      ),
    check("password")
      .isLength({
        min: 8,
      })
      .withMessage("Password must have at least 8 characters"),
    check("passwordConfirm", "Passwords do not match")
      .isLength({ min: 8 })
      .withMessage("Password must have at least 8 characters")
      .custom((value, { req }) => value === req.body.password),
  ];
};
