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

const category = {
  title: "test_category",
};

let token: string;
let categoryID: string;

beforeAll(async () => {
  await connect();
  const testUser = await User.create(user);
  const testCategory = await Category.create(category);
  categoryID = testCategory._id.toString();
  token = signToken(testUser._id);
});

afterAll(async () => {
  await clear();
  await close();
  jest.clearAllMocks();
});

describe("GET /api/categories", () => {
  it("should retrieve all the created categories", (done) => {
    request(app)
      .get("/api/categories")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toMatch(/success/i);
        expect(res.body.categories).toBeTruthy();
        expect(res.body.categories).toHaveLength(1);
        expect(res.body.categories[0].title).toBe(category.title);
        return done();
      });
  });
});

describe("POST /api/categories", () => {
  it("should create a new resource of Category", (done) => {
    request(app)
      .post("/api/categories")
      .type("form")
      .send({ title: "new_category" })
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toMatch(/success/i);
        expect(res.body.category).toBeTruthy();
        expect(res.body.category.title).toMatch(/new_category/i);
        return done();
      });
  });
});

describe("GET /api/categories/:categoryID", () => {
  it("should retrieve the category of the given ID", (done) => {
    request(app)
      .get(`/api/categories/${categoryID}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toMatch(/success/i);
        expect(res.body.category).toBeTruthy();
        expect(res.body.category.title).toMatch(category.title);
        return done();
      });
  });
});
describe("PATCH /api/categories/:categoryID", () => {
  it("should update the category of the given ID", (done) => {
    request(app)
      .patch(`/api/categories/${categoryID}`)
      .type("form")
      .send({ title: "updated_category" })
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toMatch(/success/i);
        expect(res.body.category).toBeTruthy();
        expect(res.body.category.title).toMatch(/updated_category/i);
        return done();
      });
  });
});

describe("DELETE /api/categories/:categoryID", () => {
  it("should delete the category of the given ID", (done) => {
    request(app)
      .delete(`/api/categories/${categoryID}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.status).toMatch(/success/i);
        expect(res.body.category).toBeNull();
        const category = await Category.findById(categoryID);
        expect(category).toBeNull();
        return done();
      });
  });
});
