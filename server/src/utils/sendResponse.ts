import { Response } from "express";

const sendResponse = <T>(res: Response, statusCode: number, data: T) => {
  return res.status(statusCode).json({
    status: `${statusCode}`.startsWith("4") ? "fail" : "success",
    ...data,
  });
};

export default sendResponse;
