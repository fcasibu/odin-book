import express from "express";
import { verify } from "../controllers/authController";
import { getAllNotifications } from "../controllers/notificationController";

const router = express.Router();

router.use(verify);

router.route("/").get(getAllNotifications);

export default router;
