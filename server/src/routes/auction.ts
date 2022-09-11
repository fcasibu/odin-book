import express from "express";

import {
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

export default router;
