import request from "supertest";

import app from "../app";
import User from "../model/user";
import { validateSignIn, validateSignUp } from "../utils/validators";
import { connect, close, clear } from "../mongoConfigTesting";

jest.mock("../utils/validators", () => {
    return {
        validateSignIn: jest.fn(() => []),
        validateSignUp: jest.fn(() => []),
        validateUpdateUser: jest.fn(() => []),
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

afterEach(() => {
    jest.fn().mockReset();
});

afterAll(async () => {
    await clear();
    await close();
});

let token: string;
describe("POST /api/signUp", () => {
    it("responds with a success status and user info with correct defaults", (done) => {
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
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.user).toBeTruthy();
                expect(res.body.token).toBeTruthy();
                expect(res.body.user.odinTokens).toBe(500);
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
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.token).toBeTruthy();
                expect(validateSignIn).toBeCalledTimes(1);
                token = res.body.token;
                return done();
            });
    });
    it("responds with a message User does not exist", (done) => {
        request(app)
            .post("/api/signIn")
            .type("form")
            .send({ email: "t1@t.com", password: "asdf1234" })
            .expect("Content-Type", /json/)
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/fail/i);
                expect(res.body.message).toMatch(/user does not exist/i);
                expect(validateSignIn).toBeCalledTimes(1);
                return done();
            });
    });
    it("responds with a message You have entered an invalid password", (done) => {
        request(app)
            .post("/api/signIn")
            .type("form")
            .send({ email: "t@t.com", password: "asdf123q" })
            .expect("Content-Type", /json/)
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/fail/i);
                expect(res.body.message).toMatch(/you have entered an invalid password/i);
                expect(validateSignIn).toBeCalledTimes(1);
                return done();
            });
    });
});

describe("GET /api/verify", () => {
    it("should respond with the success status and user info", (done) => {
        request(app)
            .get("/api/verify")
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.user.firstName).toMatch(/first/i);
                expect(res.body.user.lastName).toMatch(/last/i);
                expect(res.body.user.email).toBe("t@t.com");
                return done();
            });
    });
    it("should respond with a message Unauthorized if not authenticated", (done) => {
        request(app)
            .get("/api/verify")
            .set("Authorization", `Bearer `)
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).toMatch(/unauthorized/i);
                return done();
            });
    });
});
