import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  max: 5,
  windowMs: 1000,
  standardHeaders: true,
  message: "Too many request from this IP",
});

export default limiter;
