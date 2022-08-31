import Request from "../model/request";
import { IUser } from "../model/user";
import catchAsync from "../utils/catchAsync";
import CustomError from "../utils/customError";
import sendResponse from "../utils/sendResponse";

export const getAllFriendRequest = catchAsync(async (req, res, next) => {
  const { id } = req.user as IUser;
  const requests = await Request.find({
    receiver: id,
    group: { $exists: false },
    status: "Pending",
  })
    .populate("sender", "firstName lastName")
    .exec();

  return sendResponse(res, 200, { requests });
});

export const createRequest = catchAsync(async (req, res, next) => {
  const { id } = req.user as IUser;
  const isRequestSent = await Request.findOne({
    receiver: req.params.receiverID,
    sender: id,
    status: "Pending",
  }).exec();

  if (isRequestSent) {
    return next(new CustomError("Request has already been sent", 400));
  }

  const request = await Request.create({
    sender: id,
    receiver: req.params.receiverID,
    group: req.params.groupID ?? undefined,
  });

  return sendResponse(res, 200, { request });
});

export const updateRequest = catchAsync(async (req, res, next) => {
  const { id } = req.user as IUser;
  const isFriendsAlready = await Request.findOne({
    $or: [
      { receiver: id, sender: req.params.senderID },
      { sender: req.params.senderID, receiver: id },
    ],
    status: "Accepted",
  }).exec();

  if (isFriendsAlready) {
    return next(new CustomError("Both user are already friends", 400));
  }

  const request = await Request.findOneAndUpdate(
    { receiver: id, sender: req.params.senderID },
    { status: "Accepted" },
    { new: true }
  ).exec();

  return sendResponse(res, 200, { request });
});

export const deleteRequest = catchAsync(async (req, res, next) => {
  const { id } = req.user as IUser;
  await Request.findOneAndDelete({
    receiver: id,
    sender: req.params.senderID,
    status: "Pending",
  }).exec();

  return sendResponse(res, 200, { request: null });
});
