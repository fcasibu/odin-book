import express from "express";

import { verify } from "../controllers/authController";
import {
    createLike,
    deleteLike,
    getAllLikes,
} from "../controllers/likeController";

const router = express.Router();

router.use(verify);

router.route("/:locationID").get(getAllLikes).post(createLike);

router.route("/:locationID/:likeID").delete(deleteLike);

export default router;
