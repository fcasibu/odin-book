import request from "supertest";

import app from "../app";
import User from "../model/user";
import { validateSignIn, validateSignUp } from "../utils/validators";
import { connect, close, clear } from "../mongoConfigTesting";

jest.mock("../utils/validators", () => {
  return {
    validateSignIn: jest.fn(() => []),
    validateSignUp: jest.fn(() => []),
  };
});
jest.mock("../middlewares/isValid", () => jest.fn((req, res, next) => next()));

const user = {
  firstName: "first",
  lastName: "last",
  email: "t@t.com",
  password: "asdf1234",
  passwordConfirm: "asdf1234",
};

beforeAll(async () => {
  await connect();
  await User.create(user);
});

afterAll(async () => {
  await clear();
  await close();
  jest.clearAllMocks();
});

describe("POST /api/signUp", () => {
  it("responds with a success status and user info", (done) => {
    const mockUser = {
      firstName: "john",
      lastName: "doe",
      email: "john@doe.com",
      password: "asdf1234",
      passwordConfirm: "asdf1234",
    };
    request(app)
      .post("/api/signUp")
      .type("form")
      .send(mockUser)
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toBe("success");
        expect(res.body.user).toBeTruthy();
        expect(validateSignUp).toBeCalledTimes(1);
        return done();
      });
  });
});

describe("POST /api/signIn", () => {
  it("responds with a success status and token", (done) => {
    request(app)
      .post("/api/signIn")
      .type("form")
      .send({ email: "t@t.com", password: "asdf1234" })
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toBe("success");
        expect(res.body.token).toBeTruthy();
        expect(validateSignIn).toBeCalledTimes(1);
        return done();
      });
  });
});
