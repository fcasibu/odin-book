import express from "express";

import {
    bid,
    createAuction,
    deleteAuction,
    getAllAuctions,
    getAuction,
    updateAuction,
} from "../controllers/auctionController";
import { verify } from "../controllers/authController";

const router = express.Router();

router.use(verify);

router.route("/").get(getAllAuctions).post(createAuction);

router.route("/:auctionID").get(getAuction).patch(updateAuction).delete(deleteAuction);

router.route("/:auctionID/bid").post(bid);

export default router;
