import express from "express";

import { signIn, signUp } from "../controllers/authController.";

const router = express.Router();

router.route("/api/signIn").post(signIn);

router.route("/api/signUp").post(signUp);

export default router;
