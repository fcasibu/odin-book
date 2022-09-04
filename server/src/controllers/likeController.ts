import Like from "../model/like";
import { IUser } from "../model/user";

import catchAsync from "../utils/catchAsync";
import { paginate } from "../utils/paginate";
import sendResponse from "../utils/sendResponse";

export const getAllLikes = catchAsync(async (req, res, next) => {
  const skip = paginate(Number(req.query.page ?? 1));
  const likes = await Like.find({ location: req.params.locationID })
    .skip(skip)
    .limit(15)
    .populate("user", "firstName lastName")
    .exec();

  return sendResponse(res, 200, { likes });
});
