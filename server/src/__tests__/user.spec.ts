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
let id: string;

beforeAll(async () => {
  await connect();
  const testUser = await User.create(user);
  id = testUser._id.toString();
  token = signToken(testUser._id);
});

afterAll(async () => {
  await clear();
  await close();
  jest.clearAllMocks();
});

describe("GET /api/users/:userID", () => {
  it("should respond with a success status and correct user info", (done) => {
    request(app)
      .get(`/api/users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toMatch(/success/i);
        expect(res.body.user).toBeTruthy();
        expect(res.body.user.firstName).toBe(user.firstName);
        expect(res.body.user.lastName).toBe(user.lastName);
        expect(res.body.user.email).toBe(user.email);
        expect(res.body.user._id).toBe(id);
        return done();
      });
  });
});

describe("PATCH /api/users/:userID", () => {
  it("should respond with a success status and an updated user info", (done) => {
    request(app)
      .patch(`/api/users/${id}`)
      .type("form")
      .send({
        ...user,
        firstName: "john",
        lastName: "doe",
        bio: "test bio",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toMatch(/success/i);
        expect(res.body.user).toBeTruthy();
        expect(res.body.user.firstName).toMatch(/john/i);
        expect(res.body.user.lastName).toMatch(/doe/i);
        expect(res.body.user.bio).toMatch(/test bio/i);
        return done();
      });
  });
  it("should not update odinTokens and image fields", (done) => {
    request(app)
      .patch(`/api/users/${id}`)
      .type("form")
      .send({
        ...user,
        odinTokens: 10000,
        bannerURL: "example.com",
        avatarURL: "example.com",
        email: "new@test.com",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toMatch(/success/i);
        expect(res.body.user).toBeTruthy();
        expect(res.body.user.odinTokens).not.toBe(10000);
        expect(res.body.user.email).not.toBe("new@test.com");
        expect(res.body.user.bannerURL).toBeUndefined();
        expect(res.body.user.avatarURL).toBeUndefined();
        return done();
      });
  });
});

describe("DELETE /api/users/:userID", () => {
  it("should respond with null and should not be able to find the user", (done) => {
    request(app)
      .delete(`/api/users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.status).toMatch(/success/i);
        expect(res.body.user).toBeNull();
        const deletedUser = await User.findById(id);
        expect(deletedUser).toBeNull();
        return done();
      });
  });
});
