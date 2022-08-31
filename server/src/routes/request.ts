import express from "express";

import { verify } from "../controllers/authController.";
import {
  createRequest,
  getAllFriendRequest,
  updateRequest,
} from "../controllers/requestController";

const router = express.Router();

router.use(verify);

router.route("/friends").get(getAllFriendRequest);

router.route("/:senderID").patch(updateRequest);

router.route("/:receiverID/send").post(createRequest);

export default router;
