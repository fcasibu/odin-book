import createError from "http-errors";
import express, { Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
dotenv.config();

import User from "./model/user";
import authRouter from "./routes/auth";

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

app.use((req, res, next) => {
  next(createError(404));
});

interface ResponseError extends Error {
  status: number;
}

// error handler
app.use((err: ResponseError, req: Request, res: Response) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({
    status: "fail",
    message: err.message,
    stack: err.stack,
  });
});

export default app;
