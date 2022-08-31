import express from "express";

import { verify } from "../controllers/authController.";
import {
  createRequest,
  getAllFriendRequest,
} from "../controllers/requestController";

const router = express.Router();

router.use(verify);

router.route("/friends").get(getAllFriendRequest);

router.route("/receiver/:receiverID").post(createRequest);

export default router;
