import Request from "../model/request";
import User, { IUser } from "../model/user";

import catchAsync from "../utils/catchAsync";
import { paginate } from "../utils/paginate";
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
  await User.findByIdAndDelete(req.params.userID).exec();
  return sendResponse(res, 200, { user: null });
});

export const getUserFriends = catchAsync(async (req, res, next) => {
  const { userID } = req.params;
  const skip = paginate(Number(req.query.page ?? 1));
  const friends = await Request.find({
    $or: [{ sender: userID }, { receiver: userID }],
    status: "Accepted",
  })
    .populate("sender", "firstName lastName")
    .populate("receiver", "firstName lastName")
    .skip(skip)
    .limit(10)
    .sort("-createdAt")
    .select("sender receiver")
    .exec();

  return sendResponse(res, 200, { friends });
});
