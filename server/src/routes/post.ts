import express from "express";

import { verify } from "../controllers/authController.";
import { getAllPosts } from "../controllers/postController";

const router = express.Router();

router.use(verify);

router.route("/").get(getAllPosts);

export default router;
