import Comment from "../model/comment";
import { IUser } from "../model/user";

import catchAsync from "../utils/catchAsync";
import { paginate } from "../utils/paginate";
import sendResponse from "../utils/sendResponse";

export const getAllComments = catchAsync(async (req, res, next) => {
  const skip = paginate(Number(req.query.page ?? 1));
  const id = req.params.commentID ?? req.params.postID;

  const comments = await Comment.find({ location: id })
    .skip(skip)
           .limit(4)
    .sort("-createdAt")
    .populate("author", "firstName lastName")
    .exec();

  return sendResponse(res, 200, { comments });
});

export const createComment = catchAsync(async (req, res, next) => {
  const { id } = req.user as IUser;
  const locationID = req.params.commentID ?? req.params.postID;
  const comment = await Comment.create({
    ...req.body,
    author: id,
    location: locationID,
    model: req.params.commentID ? "Comment" : "Post",
  });

  return sendResponse(res, 201, { comment });
});

export const updateComment = catchAsync(async (req, res, next) => {
  const id = req.params.childCommentID ?? req.params.commentID;
  const comment = await Comment.findByIdAndUpdate(
    id,
    { text: req.body.text },
    { new: true }
  ).exec();

  return sendResponse(res, 200, { comment });
});

export const deleteComment = catchAsync(async (req, res, next) => {
  const id = req.params.childCommentID ?? req.params.commentID;
  await Comment.findByIdAndDelete(id);

  return sendResponse(res, 200, { comment: null });
});
