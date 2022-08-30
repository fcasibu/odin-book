import express, { Request, Response } from "express";

import { signIn, signUp, verify } from "../controllers/authController.";
import isValid from "../middlewares/isValid";
import { validateSignIn, validateSignUp } from "../utils/validators";

const router = express.Router();

router.route("/api/signIn").post(validateSignIn(), isValid, signIn);

router.route("/api/signUp").post(validateSignUp(), isValid, signUp);

router.route("/api/verify").get(verify, (req: Request, res: Response) => {
  return res.status(200).json({
    status: "success",
    user: req.user,
  });
});

export default router;
