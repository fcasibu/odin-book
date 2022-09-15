import express from "express";
import { verify } from "../controllers/authController";
import {
    deleteAllNotification,
    deleteNotification,
    getAllNotifications,
    notifyFromAuction,
    notifyFromUser,
} from "../controllers/notificationController";

const router = express.Router();

router.use(verify);

router.route("/").get(getAllNotifications).delete(deleteAllNotification);

router.route("/:notificationID").delete(deleteNotification);

router.route("/users/:userID").post(notifyFromUser);

router.route("/auctions/:auctionID").post(notifyFromAuction);

export default router;
