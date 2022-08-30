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

describe('GET /api/users/:userID', () => {
  it("should respond with a success status and correct user info", (done) => {
    request(app)
      .get(`/api/users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect('Content-Type', /json/)
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
})
