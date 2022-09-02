import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

import User from "../model/user";

import catchAsync from "../utils/catchAsync";
import CustomError from "../utils/customError";
import sendResponse from "../utils/sendResponse";

export const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (!user) {
    return next(new CustomError("User does not exist", 401));
  }

  if (!(await user.comparePassword(password))) {
    return next(new CustomError("You have entered an invalid password", 401));
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY as string, {
    expiresIn: "30d",
  });

  return sendResponse(res, 200, { token });
});

export const signUp = catchAsync(async (req, res) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY as string, {
    expiresIn: "30d",
  });

  return sendResponse(res, 201, { user, token });
});

export const verify = passport.authenticate("jwt", { session: false });
