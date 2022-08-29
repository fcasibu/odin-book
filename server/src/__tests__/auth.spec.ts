import request from "supertest";
import app from "../app";
import initializeMongoServer from "../mongoConfigTesting";

initializeMongoServer();

const user = {
  firstName: "first",
  lastName: "last",
  email: "t@t.com",
  password: "asdf1234",
  passwordConfirm: "asdf1234",
};

describe("POST /api/signUp", () => {
  it("responds with a success status and user info", (done) => {
    request(app)
      .post("/api/signUp")
      .type("form")
      .send(user)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body.status).toBe("success");
        expect(res.body.user).toBeTruthy();
        done();
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
      .then((res) => {
        expect(res.body.status).toBe("success");
        expect(res.body.token).toBeTruthy();
        done();
      });
  });
});
