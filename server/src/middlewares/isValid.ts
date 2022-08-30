import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const isValid = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).json({
      previous: req.body,
      errors: errors.array().map((el) => ({ param: el.param, msg: el.msg })),
    });
  }

  next();
};

export default isValid;
