import request from "supertest";

import app from "../app";
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
    title: 'Test Item',
    description: 'Test description',
    startingBid: 500,
    photoURL: '',
    startDate: Date.now(),
    endDate: new Date('2050').getTime()
};

let token: string;
let auctionID: string;
let categoryID: string;

beforeAll(async () => {
    await connect();
    const testUser = await User.create(user);
    const testCategory = await Category.create({ title: 'test_category' });
    categoryID = testCategory._id.toString();
    token = signToken(testUser._id);
});

afterAll(async () => {
    await clear();
    await close();
    jest.clearAllMocks();
});

describe("POST /api/auctions", () => {
    it("should create a new auction", done => {
        request(app)
            .post('/api/auctions')
            .type('form')
            .send({ ...auction, category: categoryID })
            .set("Authorization", `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                request(app)
                expect(res.body.status).toMatch(/success/i);
                auctionID = res.body.item.auction._id.toString();
                expect(res.body.item).toBeTruthy();
                expect(res.body.item.title).toBe(auction.title);
                expect(res.body.item.auction.description).toBe(auction.description);
                expect(res.body.item.auction.startingBid).toBe(auction.startingBid);
                expect(res.body.item.auction.startDate).toBe(new Date(auction.startDate).toISOString());
                expect(res.body.item.auction.endDate).toBe(new Date(auction.endDate).toISOString());
                return done();
            })
    })
})

describe("GET /api/auctions/", () => {
    it("should retrieve all the active auctions", done => {
        request(app)
            .get('/api/auctions/')
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i)
                expect(res.body.auctions).toBeTruthy();
                expect(res.body.auctions).toHaveLength(1);
                return done();
            })
    })
})

describe("GET /api/auctions/auctionID", () => {
    it("should retrieve all the active auctions", done => {
        request(app)
            .get(`/api/auctions/${auctionID}`)
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i)
                expect(res.body.auction).toBeTruthy();
                expect(res.body.auction.item).toBeTruthy();
                expect(res.body.auction.description).toBe(auction.description);
                expect(res.body.auction.item.title).toBe(auction.title);
                return done();
            })
    })
})
