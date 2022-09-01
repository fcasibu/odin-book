import request from "supertest";

import app from "../app";
import User from "../model/user";
import Post from "../model/post";
import { connect, close, clear } from "../mongoConfigTesting";
import { signToken } from "../utils/jwtUtility";

const user = {
  firstName: "first",
  lastName: "last",
  email: "t@t.com",
  password: "asdf1234",
  passwordConfirm: "asdf1234",
};

const post = {
  text: "hello world",
};

let token: string;
let id: string;
let postID: string;

beforeAll(async () => {
  await connect();
  const testUser = await User.create(user);
  const testPost = await Post.create({ ...post, author: testUser._id });
  postId = testPost._id.toString();
  id = testUser._id.toString();
  token = signToken(testUser._id);
});

afterAll(async () => {
  await clear();
  await close();
  jest.clearAllMocks();
});

describe("POST /api/posts", () => {
  it("should create a post authored by the current user", (done) => {
    request(app)
      .post("/api/posts")
      .type("form")
      .send({ text: "test post" })
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toMatch(/success/i);
        expect(res.body.post).toBeTruthy();
        expect(res.body.post.text).toMatch(/test post/i);
        expect(res.body.post.author).toBe(id);
        return done(err);
      });
  });
});

describe("GET /api/posts", () => {
  it("should respond with the posts of the current user", (done) => {
    request(app)
      .get("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toMatch(/success/i);
        expect(res.body.posts).toBeTruthy();
        expect(res.body.posts).toHaveLength(1);
        expect(res.body.posts[0].text).toMatch(/test post/i);
        return done(err);
      });
  });
});
