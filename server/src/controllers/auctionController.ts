import { Auction, AuctionItem } from "../model/auction";
import { IUser } from "../model/user";

import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";


export const getAllAuctions = catchAsync(async (req, res, next) => {
    const auctions = await Auction.find({ active: { $ne: false } }).exec();

    return sendResponse(res, 200, { auctions });
})

export const createAuction = catchAsync(async (req, res, next) => {
    const { id } = req.user as IUser;
    const auction = await Auction.create({
        ...req.body,
        seller: id,
    });
    const item = await AuctionItem.create({
        ...req.body,
        auction
    });

    return sendResponse(res, 201, { item });
})
