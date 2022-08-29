import { Response } from 'express';

const sendResponse = (res: Response, statusCode: number, data: Data) => {
  return res.status(statusCode).json({
    status: `${statusCode}`.startsWith('4') ? 'fail' : 'success',
    ...data
  });
};

export default sendResponse;
