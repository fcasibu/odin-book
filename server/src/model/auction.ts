import mongoose from "mongoose";

export interface IAuction extends mongoose.Document {
  seller: mongoose.Schema.Types.ObjectId;
  category: mongoose.Schema.Types.ObjectId;
  description: string;
  startingBid: number;
  active: boolean;
  createdAt: Date;
  endDate: Date;
}

export interface IAuctionItem extends mongoose.Document {
  title: string;
  photoURL: string;
  auction: mongoose.Schema.Types.ObjectId;
  owner?: mongoose.Schema.Types.ObjectId;
}

export interface IAuctionBidder extends mongoose.Document {
  auction: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  bid: number;
  createdAt: Date;
}

const Schema = mongoose.Schema;

const AuctionSchema = new Schema<IAuction>({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: {
    type: String,
    minLength: 10,
    maxLength: 2000,
    required: true,
  },
  startingBid: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const AuctionBidderSchema = new Schema<IAuctionBidder>({
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auction",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bid: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AuctionItemSchema = new Schema<IAuctionItem>({
  title: {
    type: String,
    minLength: 3,
    maxLength: 30,
    required: true,
  },
  photoURL: {
    type: String,
  },
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auction",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Auction = mongoose.model("Auction", AuctionSchema);
export const AuctionBidder = mongoose.model(
  "AuctionBidder",
  AuctionBidderSchema
);
export const AuctionItem = mongoose.model("AuctionItem", AuctionItemSchema);
