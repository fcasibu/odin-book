import Request from "../model/request";
import { IUser } from "../model/user";
import catchAsync from "../utils/catchAsync";
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
  const request = await Request.create({
    sender: id,
    receiver: req.params.receiverID,
    group: req.params.groupID ?? undefined,
  });

  return sendResponse(res, 200, { request });
});
