import Notification from "../model/notification";
import { IUser } from "../model/user";

import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

// TODO; Socket IO

export const getAllNotifications = catchAsync(async (req, res, next) => {
    const { id } = req.user as IUser;
    const notifications = await Notification.find({ to: id }).exec();

    return sendResponse(res, 200, { notifications });
});
