import express from "express";

import { verify } from "../controllers/authController.";
import { getUser } from "../controllers/userController";

const router = express.Router();

router.use(verify);

router.route("/:userID").get(getUser);

export default router;
