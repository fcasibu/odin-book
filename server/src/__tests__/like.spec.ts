import request from "supertest";

import app from "../app";
import User from "../model/user";
import Post from "../model/post";
import Comment from "../model/comment";

import { connect, close, clear } from "../mongoConfigTesting";
import { signToken } from "../utils/jwtUtility";
import Like from "../model/like";

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
let postID: string;
let commentID: string;
let childCommentID: string;
const likeIDs: string[] = [];

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
    const testLikePost = Like.create({
        location: testPost._id,
        user: testUser._id,
        model: "Post",
    });
    const testLikeComment = Like.create({
        location: testComment._id,
        user: testUser._id,
        model: "Comment",
    });
    const testLikeChildComment = Like.create({
        location: testChildComment._id,
        user: testUser._id,
        model: "Comment",
    });

    const [like1, like2, like3] = await Promise.all([
        testLikePost,
        testLikeComment,
        testLikeChildComment,
    ]);

    postID = testPost._id.toString();
    commentID = testComment._id.toString();
    childCommentID = testChildComment._id.toString();
    likeIDs.push(
        like1._id.toString(),
        like2._id.toString(),
        like3._id.toString()
    );
    token = signToken(testUser._id);
});

afterAll(async () => {
    await clear();
    await close();
    jest.clearAllMocks();
});

describe("GET /api/likes/:locationID", () => {
    it("should retrieve the likes of a post", (done) => {
        request(app)
            .get(`/api/likes/${postID}?type=Post`)
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.likes).toBeTruthy();
                expect(res.body.likes).toHaveLength(1);
                expect(res.body.likes[0].user.firstName).toBe(user.firstName);
                return done();
            });
    });
    it("should retrieve the likes of a comment", (done) => {
        request(app)
            .get(`/api/likes/${commentID}?type=Comment`)
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.likes).toBeTruthy();
                expect(res.body.likes).toHaveLength(1);
                expect(res.body.likes[0].user.firstName).toBe(user.firstName);
                return done();
            });
    });
    it("should retrieve the likes of a childComment", (done) => {
        request(app)
            .get(`/api/likes/${childCommentID}?type=Comment`)
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.likes).toBeTruthy();
                expect(res.body.likes).toHaveLength(1);
                expect(res.body.likes[0].user.firstName).toBe(user.firstName);
                return done();
            });
    });
});

describe("POST /api/likes/:locationID", () => {
    it("should add a like on a post", (done) => {
        request(app)
            .post(`/api/likes/${postID}?type=Post`)
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.like).toBeTruthy();
                expect(res.body.like.location).toBe(postID);
                expect(res.body.like.model).toMatch(/post/i);
                return done();
            });
    });
    it("should add a like on a comment", (done) => {
        request(app)
            .post(`/api/likes/${commentID}?type=Comment`)
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.like).toBeTruthy();
                expect(res.body.like.location).toBe(commentID);
                expect(res.body.like.model).toMatch(/comment/i);
                return done();
            });
    });
    it("should add a like on a childCOmment", (done) => {
        request(app)
            .post(`/api/likes/${childCommentID}?type=Comment`)
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.like).toBeTruthy();
                expect(res.body.like.location).toBe(childCommentID);
                expect(res.body.like.model).toMatch(/comment/i);
                return done();
            });
    });

    it("should respond with a 400 error if a type is not specified", (done) => {
        request(app)
            .post(`/api/likes/${postID}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/fail/i);
                expect(res.body.message).toMatch(
                    /you need to specify the correct query type/i
                );
                return done();
            });
    });
});

describe("DELETE /api/likes/:locationID/:likeID", () => {
    it("should successfuly delete a like on a post", (done) => {
        request(app)
            .delete(`/api/likes/${postID}/${likeIDs[0]}`)
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end(async (err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.like).toBeNull();
                const like = await Like.findOne({ location: postID, _id: likeIDs[0] });
                expect(like).toBeNull();
                return done();
            });
    });
    it("should successfuly delete a like on a comment", (done) => {
        request(app)
            .delete(`/api/likes/${commentID}/${likeIDs[1]}`)
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end(async (err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.like).toBeNull();
                const like = await Like.findOne({
                    location: commentID,
                    _id: likeIDs[1],
                });
                expect(like).toBeNull();
                return done();
            });
    });
    it("should successfuly delete a like on a childComment", (done) => {
        request(app)
            .delete(`/api/likes/${childCommentID}/${likeIDs[2]}`)
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end(async (err, res) => {
                if (err) return done(err);
                expect(res.body.status).toMatch(/success/i);
                expect(res.body.like).toBeNull();
                const like = await Like.findOne({
                    location: childCommentID,
                    _id: likeIDs[2],
                });
                expect(like).toBeNull();
                return done();
            });
    });
});
