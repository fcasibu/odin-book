import request from "supertest";

import app from "../app";
import User from "../model/user";
import Post from "../model/post";
import { connect, close, clear } from "../mongoConfigTesting";
import { signToken } from "../utils/jwtUtility";
import Comment from "../model/comment";

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

const comment = {
    text: "test comment",
};

const childComment = {
    text: "test child comment",
};

let token: string;
let id: string;
let postID: string;
let commentID: string;
let childCommentID: string;

beforeAll(async () => {
    await connect();
    const testUser = await User.create(user);
    const testPost = await Post.create({ ...post, author: testUser._id });
    const testComment = await Comment.create({
        ...comment,
        location: testPost._id,
        author: testUser._id,
        model: "Post",
    });
    const testChildComment = await Comment.create({
        ...childComment,
        location: testComment._id,
        author: testUser._id,
        model: "Comment",
    });
    postID = testPost._id.toString();
    commentID = testComment._id.toString();
    childCommentID = testChildComment._id.toString();
    id = testUser._id.toString();
    token = signToken(testUser._id);
});

afterAll(async () => {
    await clear();
    await close();
    jest.clearAllMocks();
});

describe("POSTS", () => {
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
                    return done();
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
                    expect(res.body.posts).toHaveLength(2);
                    expect(res.body.posts[0].text).toMatch(/hello world/i);
                    return done();
                });
        });
    });

    describe("GET /api/posts/:postID", () => {
        it("should respond with the post successfuly", (done) => {
            request(app)
                .get(`/api/posts/${postID}`)
                .set("Authorization", `Bearer ${token}`)
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.status).toMatch(/success/i);
                    expect(res.body.post).toBeTruthy();
                    expect(res.body.post.text).toMatch(/hello world/i);
                    return done();
                });
        });
    });

    describe("PATCH /api/posts/:postID", () => {
        it("current user should be able to edit their post successfully", (done) => {
            request(app)
                .patch(`/api/posts/${postID}`)
                .type("form")
                .send({ text: "new text" })
                .set("Authorization", `Bearer ${token}`)
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.status).toMatch(/success/i);
                    expect(res.body.post).toBeTruthy();
                    expect(res.body.post.text).toMatch(/new text/i);
                    return done();
                });
        });
    });

    describe("DELETE /api/posts/:postID", () => {
        it("current user should be able to delete their post successfully", (done) => {
            request(app)
                .delete(`/api/posts/${postID}`)
                .set("Authorization", `Bearer ${token}`)
                .expect("Content-Type", /json/)
                .expect(200)
                .end(async (err, res) => {
                    if (err) return done(err);
                    expect(res.body.status).toMatch(/success/i);
                    expect(res.body.post).toBeNull();
                    const post = await Post.findById(postID);
                    expect(post).toBeNull();
                    return done();
                });
        });
    });
});

describe("COMMENTS", () => {
    describe("GET /api/posts/:postID/comments", () => {
        it("should retrieve all the comments of the postID", (done) => {
            request(app)
                .get(`/api/posts/${postID}/comments`)
                .set("Authorization", `Bearer ${token}`)
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.status).toMatch(/success/i);
                    expect(res.body.comments).toBeTruthy();
                    expect(res.body.comments).toHaveLength(1);
                    expect(res.body.comments[0].text).toMatch(/test comment/i);
                    expect(res.body.comments[0].author.firstName).toBe(user.firstName);
                    return done();
                });
        });
    });

    describe("POST /api/posts/:postID/comments", () => {
        it("should create a new comment on a post", (done) => {
            request(app)
                .post(`/api/posts/${postID}/comments`)
                .type("form")
                .send({ text: "another test" })
                .set("Authorization", `Bearer ${token}`)
                .expect("Content-Type", /json/)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.status).toMatch(/success/i);
                    expect(res.body.comment).toBeTruthy();
                    expect(res.body.comment.text).toMatch(/another test/i);
                    expect(res.body.comment.location).toBe(postID);
                    return done();
                });
        });
    });

    describe("PATCH /api/posts/:postID/comments/:commentID", () => {
        it("should update the comment", (done) => {
            request(app)
                .patch(`/api/posts/${postID}/comments/${commentID}`)
                .type("form")
                .send({ text: "updated comment" })
                .set("Authorization", `Bearer ${token}`)
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.status).toMatch(/success/i);
                    expect(res.body.comment).toBeTruthy();
                    expect(res.body.comment.text).toMatch(/updated comment/i);
                    expect(res.body.comment.location).toBe(postID);
                    return done();
                });
        });
    });

    describe("DELETE /api/posts/:postID/comments/:commentID", () => {
        it("should delete the comment", (done) => {
            request(app)
                .delete(`/api/posts/${postID}/comments/${commentID}`)
                .set("Authorization", `Bearer ${token}`)
                .expect("Content-Type", /json/)
                .expect(200)
                .end(async (err, res) => {
                    if (err) return done(err);
                    expect(res.body.status).toMatch(/success/i);
                    expect(res.body.comment).toBeNull();
                    const comment = await Comment.findById(commentID);
                    expect(comment).toBeNull();
                    return done();
                });
        });
    });

    describe("GET /api/posts/:postID/comments/:commentID/childComments", () => {
        it("should retrieve all the child comments of the commentID", (done) => {
            request(app)
                .get(`/api/posts/${postID}/comments/${commentID}/childComments`)
                .set("Authorization", `Bearer ${token}`)
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.status).toMatch(/success/i);
                    expect(res.body.comments).toBeTruthy();
                    expect(res.body.comments).toHaveLength(1);
                    expect(res.body.comments[0].text).toMatch(/test child comment/i);
                    expect(res.body.comments[0].author.firstName).toBe(user.firstName);
                    return done();
                });
        });
    });

    describe("POST /api/posts/:postID/comments/:commentID", () => {
        it("should create a new child comment on a comment", (done) => {
            request(app)
                .post(`/api/posts/${postID}/comments/${commentID}/childComments`)
                .type("form")
                .send({ text: "test child comment" })
                .set("Authorization", `Bearer ${token}`)
                .expect("Content-Type", /json/)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.status).toMatch(/success/i);
                    expect(res.body.comment).toBeTruthy();
                    expect(res.body.comment.text).toMatch(/test child comment/i);
                    expect(res.body.comment.location).toBe(commentID);
                    return done();
                });
        });
    });

    describe("PATCH /api/posts/:postID/comments/:commentID/childComments/:childCommentID", () => {
        it("should update the childComment", (done) => {
            console.log(childCommentID);
            request(app)
                .patch(
                    `/api/posts/${postID}/comments/${commentID}/childComments/${childCommentID}`
                )
                .type("form")
                .send({ text: "updated child comment" })
                .set("Authorization", `Bearer ${token}`)
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.status).toMatch(/success/i);
                    expect(res.body.comment).toBeTruthy();
                    expect(res.body.comment.text).toMatch(/updated child comment/i);
                    expect(res.body.comment.location).toBe(commentID);
                    return done();
                });
        });
    });

    describe("DELETE /api/posts/:postID/comments/:commentID", () => {
        it("should delete the child comment", (done) => {
            request(app)
                .delete(
                    `/api/posts/${postID}/comments/${commentID}/childComments/${childCommentID}`
                )
                .set("Authorization", `Bearer ${token}`)
                .expect("Content-Type", /json/)
                .expect(200)
                .end(async (err, res) => {
                    if (err) return done(err);
                    expect(res.body.status).toMatch(/success/i);
                    expect(res.body.comment).toBeNull();
                    const comment = await Comment.findById(childCommentID);
                    expect(comment).toBeNull();
                    return done();
                });
        });
    });
});
