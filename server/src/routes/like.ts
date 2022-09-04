import express from "express";

import {
  createLike,
  deleteLike,
  getAllLikes,
} from "../controllers/likeController";

const router = express.Router();

router.route("/:locationID").get(getAllLikes).post(createLike);

router.route("/:locationID/:likeID").delete(deleteLike);

export default router;
