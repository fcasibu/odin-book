import express, { NextFunction, Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
dotenv.config();

import User from "./model/user";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import requestRouter from "./routes/request";
import postRouter from "./routes/post";
import likeRouter from "./routes/like";
import categoryRouter from "./routes/category";

import CustomError from "./utils/customError";

const app = express();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY as string,
};

passport.use(
  new JWTStrategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.id, "-password").exec();
      if (!user) return done(null, false, { message: "User does not exist" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

app.use(passport.initialize());
app.use(helmet());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRouter);
app.use("/api/users", userRouter);
app.use("/api/requests", requestRouter);
app.use("/api/posts", postRouter);
app.use("/api/likes", likeRouter);
app.use("/api/categories", categoryRouter);

interface ResponseError extends Error {
  status: number;
}

app.use((req, res, next) => {
  next(new CustomError("Not Found", 404));
});
// error handler
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === "production") {
      res.status(err.status || 500).json({
        status: "fail",
        message: err.message,
      });
    } else {
      res.status(err.status || 500).json({
        status: "fail",
        message: err.message,
        stack: err.stack,
      });
    }
  }
);

export default app;
