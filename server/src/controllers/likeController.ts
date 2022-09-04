import Like from "../model/like";
import { IUser } from "../model/user";

import catchAsync from "../utils/catchAsync";
import CustomError from "../utils/customError";
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

export const createLike = catchAsync(async (req, res, next) => {
  const { id } = req.user as IUser;
  const types = ["Post", "Comment"];

  if (!req.query.type || !types.includes(req.query.type as string)) {
    return next(
      new CustomError("You need to specify the correct query type", 400)
    );
  }

  const like = await Like.create({
    user: id,
    location: req.params.locationID,
    model: req.query.type,
  });

  return sendResponse(res, 201, { like });
});

export const deleteLike = catchAsync(async (req, res, next) => {
  await Like.findOneAndDelete({
    location: req.params.locationID,
    _id: req.params.likeID,
  }).exec();

  return sendResponse(res, 200, { like: null });
});
