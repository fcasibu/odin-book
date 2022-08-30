import User from "../model/user";

import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userID, "-password").exec();
  return sendResponse(res, 200, { user });
});
