import express from "express";
import logger from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import mung from "express-mung";

import { dbConnect } from "./db";
import indexRouter from "./routes/index";
import limiter from "./middlewares/rateLimiter";
// import redact, { modify } from "./middlewares/resRedactor";

const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(
  cookieSession({
    // this actually not working normally but maybe on deployment
    // name: "*",
    secret: process.env.COOKIESECRET!,
    secure: true,
    signed: true,
    httpOnly: true,
  })
);
// app.use(mung.json(redact));

dbConnect();

app.use("/api", limiter, indexRouter);

export default app;
