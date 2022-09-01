import express from "express";

import { verify } from "../controllers/authController.";
import {
  createPost,
  deletePost,
  getAllPosts,
} from "../controllers/postController";

const router = express.Router();

router.use(verify);

router.route("/").get(getAllPosts).post(createPost);

router.route("/:postID").delete(deletePost);

export default router;
