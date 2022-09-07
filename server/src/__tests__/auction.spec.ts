import request from "supertest";

import app from "../app";
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

let token: string;

beforeAll(async () => {
    await connect();
    const testUser = await User.create(user);
    token = signToken(testUser._id);
});

afterAll(async () => {
    await clear();
    await close();
    jest.clearAllMocks();
});

describe("GET /api/auctions/", () => {
    it("should respond with JSON and correct status code", done => {
        request(app)
            .get('/api/auctions/')
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i)
                expect(res.body.auctions).toBeTruthy();
                return done();
            })
    })
})
