import express from "express";

import { verify } from "../controllers/authController.";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../controllers/postController";

const router = express.Router();

router.use(verify);

router.route("/").get(getAllPosts).post(createPost);

router.route("/:postID").delete(deletePost).patch(updatePost);

export default router;
