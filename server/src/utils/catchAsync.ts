import { NextFunction, Request, Response } from "express";

type CallbackFunc = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;

const catchAsync =
    (cb: CallbackFunc) => (req: Request, res: Response, next: NextFunction) =>
        cb(req, res, next).catch(next);

export default catchAsync;
