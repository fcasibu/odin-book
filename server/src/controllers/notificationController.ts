import Notification from "../model/notification";
import { AuctionBidder } from "../model/auction";
import { IUser } from "../model/user";

import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

// TODO; Socket IO

export const getAllNotifications = catchAsync(async (req, res, next) => {
    const { id } = req.user as IUser;
    const notifications = await Notification.find({ to: id }).exec();

    return sendResponse(res, 200, { notifications });
});

export const notifyFromUser = catchAsync(async (req, res, next) => {
    const { id } = req.user as IUser;
    await Notification.create({
        from: id,
        to: req.params.userID,
    });

    return sendResponse(res, 201, null);
});

// TODO: find better ways
export const notifyFromAuction = catchAsync(async (req, res, next) => {
    const auctionBidders = await AuctionBidder.find({ auction: req.params.auctionID }).exec();

    for (let i = 0; i < auctionBidders.length; ++i) {
        await Notification.create({
            from: req.params.auctionID,
            to: auctionBidders[i]._id,
        });
    }

    return sendResponse(res, 201, null);
});
