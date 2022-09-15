import request from "supertest";

import app from "../app";
import { Auction, AuctionBidder } from "../model/auction";
import Category from "../model/category";
import Notification from "../model/notification";
import User from "../model/user";
import { connect, close, clear } from "../mongoConfigTesting";
import { signToken } from "../utils/jwtUtility";

const user1 = {
    firstName: "john",
    lastName: "doe",
    email: "t@t.com",
    password: "asdf1234",
    passwordConfirm: "asdf1234",
};

const user2 = {
    firstName: "jane",
    lastName: "doe",
    email: "a@a.com",
    password: "asdf1234",
    passwordConfirm: "asdf1234",
};

const user3 = {
    firstName: "jeff",
    lastName: "bezos",
    email: "c@c.com",
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

let tokenOfUser1: string;
let tokenOfUser2: string;
let auctionID: string;
let user1ID: string;
let user2ID: string;
let notificationID: string;

beforeAll(async () => {
    await connect();
    const testUser1 = User.create(user1);
    const testUser2 = User.create(user2);
    const testUser3 = User.create(user3);
    const testCategory = Category.create({ title: "test_category" });
    const [u1, u2, u3, c] = await Promise.all([testUser1, testUser2, testUser3, testCategory]);
    const testNotification = Notification.create({
        from: u3._id.toString(),
        to: u1._id.toString(),
        model: "User",
    });
    const testAuction = Auction.create({
        category: c._id.toString(),
        description: auction.description,
        startingBid: auction.startingBid,
        startDate: auction.startDate,
        endDate: auction.endDate,
        seller: u2._id.toString(),
    });
    const [a, n] = await Promise.all([testAuction, testNotification]);

    auctionID = a._id.toString();
    user1ID = u1._id.toString();
    user2ID = u2._id.toString();
    notificationID = n._id.toString();
    tokenOfUser1 = signToken(u1._id);
    tokenOfUser2 = signToken(u2._id);
});

afterAll(async () => {
    await clear();
    await close();
});

// TODO: Tests for socket
describe("GET /api/notifications", () => {
    it("should retrieve all the notifications of the user1", (done) => {
        request(app)
            .get("/api/notifications")
            .set("Authorization", `Bearer ${tokenOfUser1}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.notifications).toBeTruthy();
                expect(res.body.notifications).toHaveLength(1);
                return done();
            });
    });
});

describe("POST /api/notifications/users/:userID", () => {
    it("should notify user1 of a request sent by user2", (done) => {
        request(app)
            .post(`/api/notifications/users/${user1ID}`)
            .set("Authorization", `Bearer ${tokenOfUser2}`)
            .expect("Content-Type", /json/)
            .expect(201)
            .end(async (err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                const notification = await Notification.findOne({ from: user2ID });
                expect(notification?.from.toString()).toMatch(user2ID);
                expect(notification?.to.toString()).toMatch(user1ID);
                return done();
            });
    });
});

describe("POST /api/notifications/auctions/:auctionID", () => {
    it("should notify all the bidders in an auction", (done) => {
        AuctionBidder.create({
            auction: auctionID,
            user: user1ID,
            bid: 1,
        }).then(() => {
            request(app)
                .post(`/api/notifications/auctions/${auctionID}`)
                .set("Authorization", `Bearer ${tokenOfUser1}`)
                .expect("Content-Type", /json/)
                .expect(201)
                .end(async (err, res) => {
                    if (err) return done(err);
                    expect(res.body.status).toMatch(/success/i);
                    const notification = await Notification.findOne({
                        from: auctionID,
                        to: user1ID,
                    });
                    expect(notification?.from.toString()).toMatch(auctionID);
                    expect(notification?.to.toString()).toMatch(user1ID);
                    return done();
                });
        });
    });
});

describe("DELETE /api/notifications/:notificationID", () => {
    it("should delete the notification of user1", (done) => {
        request(app)
            .delete(`/api/notifications/${notificationID}`)
            .set("Authorization", `Bearer ${tokenOfUser1}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end(async (err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.message).toMatch(/successfully deleted the notification/i)
                const notification = await Notification.findById(notificationID).exec();
                expect(notification).toBeNull();
                return done();
            });
    });
});

describe("DELETE /api/notifications/", () => {
    it("should delete all notifications of user1", (done) => {
        request(app)
            .delete(`/api/notifications/`)
            .set("Authorization", `Bearer ${tokenOfUser1}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end(async (err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.message).toMatch(/successfully deleted all notification/i)
                const notifications = await Notification.find({ to: user1ID }).exec();
                expect(notifications).toHaveLength(0);
                return done();
            });
    });
});
