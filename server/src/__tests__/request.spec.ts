import request from "supertest";

import app from "../app";
import Request from "../model/request";
import User from "../model/user";
import { connect, close, clear } from "../mongoConfigTesting";
import { signToken } from "../utils/jwtUtility";

const user1 = {
    firstName: "jane",
    lastName: "doe",
    email: "t@t.com",
    password: "asdf1234",
    passwordConfirm: "asdf1234",
};

const user2 = {
    firstName: "john",
    lastName: "doe",
    email: "a@a.com",
    password: "asdf1234",
    passwordConfirm: "asdf1234",
};

let user1Token: string;
let user2Token: string;
let user1Id: string;
let user2Id: string;

beforeAll(async () => {
    await connect();
    const testUser1 = await User.create(user1);
    const testUser2 = await User.create(user2);
    user1Id = testUser1._id.toString();
    user2Id = testUser2._id.toString();
    user1Token = signToken(testUser1._id);
    user2Token = signToken(testUser2._id);
});

afterAll(async () => {
    await clear();
    await close();
    jest.clearAllMocks();
});

describe("POST /api/requests/:receiverID/send", () => {
    it("user1 should be able to send a request to user2 and have a status of pending", (done) => {
        request(app)
            .post(`/api/requests/${user2Id}/send`)
            .set("Authorization", `Bearer ${user1Token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.request).toBeTruthy();
                expect(res.body.request.sender).toBe(user1Id);
                expect(res.body.request.receiver).toBe(user2Id);
                expect(res.body.request.status).toMatch(/pending/i);
                return done();
            });
    });
});

describe("GET /api/requests/friends", () => {
    it("user2 should have one friend request sent by user1", (done) => {
        request(app)
            .get("/api/requests/friends")
            .set("Authorization", `Bearer ${user2Token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.requests).toBeTruthy();
                expect(res.body.requests).toHaveLength(1);
                expect(res.body.requests[0].sender._id).toBe(user1Id);
                expect(res.body.requests[0].receiver).toBe(user2Id);
                return done();
            });
    });

    it("user1 should not be able to query requests they sent", (done) => {
        request(app)
            .get("/api/requests/friends")
            .set("Authorization", `Bearer ${user1Token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.requests).toBeTruthy();
                expect(res.body.requests).toHaveLength(0);
                return done();
            });
    });
});

describe("DELETE /api/requests/:senderID", () => {
    it("user2 should be able to delete the request sent by user1", (done) => {
        request(app)
            .delete(`/api/requests/${user1Id}`)
            .set("Authorization", `Bearer ${user2Token}`)
            .expect(200)
            .end(async (err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.request).toBeNull();
                const deletedRequest = await Request.findOne({
                    receiver: user2Id,
                    sender: user1Id,
                });
                expect(deletedRequest).toBeNull();
                return done();
            });
    });
});

describe("PATCH /api/requests/:senderID", () => {
    it("user2 should be able to accept user1's request", (done) => {
        request(app)
            .post(`/api/requests/${user2Id}/send`)
            .set("Authorization", `Bearer ${user1Token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end(() => {
                request(app)
                    .patch(`/api/requests/${user1Id}`)
                    .set("Authorization", `Bearer ${user2Token}`)
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.body.status).toMatch(/success/i);
                        expect(res.body.request).toBeTruthy();
                        expect(res.body.request.status).toMatch(/accepted/i);
                        return done();
                    });
            });
    });
});

describe("GET /api/users/:userID/friends", () => {
    it("user1 should have one friend which is user2", (done) => {
        request(app)
            .get(`/api/users/${user1Id}/friends`)
            .set("Authorization", `Bearer ${user1Token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.friends).toBeTruthy();
                expect(res.body.friends).toHaveLength(1);
                return done();
            });
    });
    it("user2 should have one friend which is user1", (done) => {
        request(app)
            .get(`/api/users/${user2Id}/friends`)
            .set("Authorization", `Bearer ${user1Token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.friends).toBeTruthy();
                expect(res.body.friends).toHaveLength(1);
                return done();
            });
    });
});
