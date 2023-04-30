import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mung from "express-mung";

import { dbConnect } from "./db";
import indexRouter from "./routes/index";
// import redact, { modify } from "./middlewares/resRedactor";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cookieParser());
// app.use(mung.json(redact));

dbConnect();

app.use("/", indexRouter);

export default app;
