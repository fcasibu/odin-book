import express from "express";

import { signIn } from "../controllers/authController.";

const router = express.Router();

router.route("/api/signIn").post(signIn);

export default router;
