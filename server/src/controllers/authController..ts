import jwt from "jsonwebtoken";

import User from "../model/user";

import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

export const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (!user) {
    return next(new Error("User does not exist"));
  }

  if (!(await user.comparePassword(password))) {
    return next(new Error("You have entered an invalid password"));
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT as string, {
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

  return sendResponse(res, 201, { user });
});
