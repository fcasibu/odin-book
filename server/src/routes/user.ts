import express from "express";

import { verify } from "../controllers/authController.";
import { getUser, updateUser } from "../controllers/userController";
import isValid from "../middlewares/isValid";
import { validateUpdateUser } from "../utils/validators";

const router = express.Router();

router.use(verify);

router
  .route("/:userID")
  .get(getUser)
  .patch(validateUpdateUser(), isValid, updateUser);

export default router;
