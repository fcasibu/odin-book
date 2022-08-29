import express from "express";

import { signIn, signUp } from "../controllers/authController.";
import isValid from "../middlewares/isValid";
import { validateSignIn, validateSignUp } from "../utils/validators";

const router = express.Router();

router.route("/api/signIn").post(validateSignIn(), isValid, signIn);

router.route("/api/signUp").post(validateSignUp(), isValid, signUp);

export default router;
