import request from "supertest";

import app from "../app";
import { Auction, AuctionBidder, AuctionItem } from "../model/auction";
import Category from "../model/category";
import User from "../model/user";
import { connect, close, clear } from "../mongoConfigTesting";
import { signToken } from "../utils/jwtUtility";

const user = {
    firstName: "first",
    lastName: "last",
    email: "t@t.com",
    password: "asdf1234",
    passwordConfirm: "asdf1234",
};

const auction = {
    title: "Test Item",
    description: "Test description",
    startingBid: 500,
    photoURL: "",
    startDate: Date.now(),
    endDate: new Date("2050").getTime(),
};

let token: string;
let auctionID: string;
let categoryID: string;
let userID: string;

beforeAll(async () => {
    await connect();
    const testUser = await User.create(user);
    const testCategory = await Category.create({ title: "test_category" });
    const testAuction = await Auction.create({
        category: testCategory._id.toString(),
        description: auction.description,
        startingBid: auction.startingBid,
        startDate: auction.startDate,
        endDate: auction.endDate,
        seller: testUser._id.toString(),
    });
    await AuctionItem.create({
        title: auction.title,
        photoURL: auction.photoURL,
        auction: testAuction._id.toString(),
    });
    await AuctionBidder.create({
        auction: testAuction._id.toString(),
        user: testUser._id.toString(),
        bid: 200,
    });
    auctionID = testAuction._id.toString();
    categoryID = testCategory._id.toString();
    userID = testUser._id.toString();
    token = signToken(testUser._id);
});

afterAll(async () => {
    await clear();
    await close();
});

describe("GET /api/auctions/", () => {
    it("should retrieve all the active auctions", (done) => {
        request(app)
            .get("/api/auctions/")
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.auctions).toBeTruthy();
                expect(res.body.auctions).toHaveLength(1);
                return done();
            });
    });
});

describe("POST /api/auctions", () => {
    it("should create a new auction", (done) => {
        request(app)
            .post("/api/auctions")
            .type("form")
            .send({ ...auction, category: categoryID })
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.item).toBeTruthy();
                expect(res.body.item.title).toBe(auction.title);
                expect(res.body.item.auction.description).toBe(auction.description);
                expect(res.body.item.auction.startingBid).toBe(auction.startingBid);
                expect(res.body.item.auction.startDate).toBe(
                    new Date(auction.startDate).toISOString()
                );
                expect(res.body.item.auction.endDate).toBe(new Date(auction.endDate).toISOString());
                expect(res.body.item.auction.active).toBeTruthy();
                return done();
            });
    });
});

describe("GET /api/auctions/:auctionID", () => {
    it("should retrieve all the active auctions", (done) => {
        request(app)
            .get(`/api/auctions/${auctionID}`)
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.auction).toBeTruthy();
                expect(res.body.bidders).toBeTruthy();
                expect(res.body.auction.active).toBeTruthy();
                expect(res.body.auction.description).toBe(auction.description);
                expect(res.body.auction.item).toBeTruthy();
                expect(res.body.auction.item.title).toBe(auction.title);
                expect(res.body.bidders).toHaveLength(1);
                return done();
            });
    });
});

describe("PATCH /api/auctions/:auctionID", () => {
    it("should update the auction", (done) => {
        request(app)
            .patch(`/api/auctions/${auctionID}`)
            .type("form")
            .send({ title: "New Title", description: "New Description" })
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.item).toBeTruthy();
                expect(res.body.item.title).toMatch(/new title/i);
                expect(res.body.item.auction.description).toMatch(/new description/i);
                return done();
            });
    });
});

describe("DELETE /api/auctions/:auctionID", () => {
    it("should set the auction's active field to false and respond with a success message", (done) => {
        request(app)
            .delete(`/api/auctions/${auctionID}`)
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end(async (err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.message).toMatch(/successfully deleted the auction/i);
                const auction = await Auction.findById(auctionID);
                expect(auction?.active).toBeFalsy();
                return done();
            });
    });
});

describe("POST /api/auctions/:auctionID/bid", () => {
    it("user should not be able to bid if they don't have enough odin tokens", (done) => {
        request(app)
            .post(`/api/auctions/${auctionID}/bid`)
            .type("form")
            .send({ odinTokens: 501 })
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/fail/i);
                expect(res.body.message).toMatch(/not enough odin tokens/i);
                return done();
            });
    });

    it("user should be able to bid on the auction and reduce the user's token", (done) => {
        request(app)
            .post(`/api/auctions/${auctionID}/bid`)
            .type("form")
            .send({ odinTokens: 400 })
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(201)
            .end(async (err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.bid).toBeTruthy();
                const user = await User.findById(userID);
                expect(user?.odinTokens).toBe(100);
                return done();
            });
    });
});
