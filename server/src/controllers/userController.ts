import User from "../model/user";

import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userID, "-password").exec();
  return sendResponse(res, 200, { user });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, bio, password } = req.body;

  const user = await User.findOne({ _id: req.params.userID }).exec();

  if (user) {
    Object.assign(user, { firstName, lastName, bio, password });
    await user.save();
    user.password = "";
  }

  return sendResponse(res, 200, { user });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.userID);
  return sendResponse(res, 200, { user: null });
});
