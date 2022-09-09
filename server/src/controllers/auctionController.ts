import { Auction, AuctionItem } from "../model/auction";
import { IUser } from "../model/user";

import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";


export const getAllAuctions = catchAsync(async (req, res, next) => {
    const auctions = await Auction.find({ active: { $ne: false } })
        .populate({ path: 'item' }).exec();

    return sendResponse(res, 200, { auctions });
})

export const getAuction = catchAsync(async (req, res, next) => {
    const auction = await Auction.findById(req.params.auctionID)
        .populate({ path: 'item' }).exec();

    return sendResponse(res, 200, { auction });
})

export const createAuction = catchAsync(async (req, res, next) => {
    const { id } = req.user as IUser;
    const auction = await Auction.create({
        category: req.body.category,
        description: req.body.description,
        startingBid: req.body.startingBid,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        seller: id,
    });
    const item = await AuctionItem.create({
        title: req.body.title,
        photoURL: req.body.photoURL, // change to multer/cloudinary later
        auction
    });

    return sendResponse(res, 201, { item });
})
