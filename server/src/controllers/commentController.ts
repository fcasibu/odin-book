import Comment from "../model/comment";

import catchAsync from "../utils/catchAsync";
import { paginate } from "../utils/paginate";
import sendResponse from "../utils/sendResponse";

export const getAllComments = catchAsync(async (req, res, next) => {
  const skip = paginate(Number(req.query.page ?? 1));

  const comments = await Comment.find({ location: req.params.postID })
    .skip(skip)
    .limit(4)
    .sort("-createdAt")
    .exec();

  return sendResponse(res, 200, { comments });
});
