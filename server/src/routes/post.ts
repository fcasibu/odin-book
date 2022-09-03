import express from "express";

import { verify } from "../controllers/authController.";
import {
  createChildComment,
  createComment,
  getAllComments,
} from "../controllers/commentController";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/postController";

const router = express.Router();

router.use(verify);

router.route("/").get(getAllPosts).post(createPost);

router.route("/:postID").get(getPost).delete(deletePost).patch(updatePost);

router.route("/:postID/comments").get(getAllComments).post(createComment);

router.route("/:postID/comments/:commentID").post(createChildComment);

export default router;
