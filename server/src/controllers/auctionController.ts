import { Auction } from "../model/auction";

import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";


export const getAllAuctions = catchAsync(async (req, res, next) => {
    const auctions = await Auction.find({ active: { $ne: false } }).exec();

    return sendResponse(res, 200, { auctions });
})
