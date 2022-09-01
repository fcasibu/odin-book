import Post from "../model/post";
import Request from "../model/request";
import { IUser } from "../model/user";

import catchAsync from "../utils/catchAsync";
import { paginate } from "../utils/paginate";
import sendResponse from "../utils/sendResponse";

export const getAllPosts = catchAsync(async (req, res) => {
  const { id } = req.user as IUser;
  const skip = paginate(Number(req.query.page ?? 1));

  const sender = Request.find({
    $or: [{ sender: id }, { receiver: id }],
    status: "Accepted",
  })
    .skip(skip)
    .limit(10)
    .distinct("sender");

  const receiver = Request.find({
    $or: [{ sender: id }, { receiver: id }],
    status: "Accepted",
  })
    .skip(skip)
    .limit(10)
    .distinct("receiver");

  const friends = (await Promise.all([sender, receiver]))
    .flat()
    .filter((_id) => _id.toString() !== id);

  const posts = await Post.find({
    $or: [{ author: id }, { author: { $in: friends } }],
  })
    .skip(skip)
    .limit(10)
    .populate("author", "firstName lastName");

  return sendResponse(res, 200, { posts });
});

export const createPost = catchAsync(async (req, res) => {
  const { id } = req.user as IUser;
  const post = await Post.create({
    ...req.body,
    author: id,
  });

  return sendResponse(res, 201, { post });
});

export const deletePost = catchAsync(async (req, res) => {
  const { id } = req.user as IUser;
  await Post.findOneAndDelete({
    _id: req.params.postId,
    author: id,
  });
  return sendResponse(res, 200, { post: null });
});
