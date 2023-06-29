import { Router } from "express";
import { sync, drop } from "../models/migration";
import { link } from "../models/relation";

const migrationsRouter = Router();

migrationsRouter.get("/sync", async (req, res) => {
  try {
    sync();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
});

migrationsRouter.get("/link", async (req, res) => {
  try {
    link();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

migrationsRouter.get("/drop", async (req, res) => {
  try {
    drop();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
});

export default migrationsRouter;
