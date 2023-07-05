import { Router } from "express";
import { MigrationsController } from "../controllers/migration";

const migrationsRouter = Router();
const migrationsController = new MigrationsController();

migrationsRouter.get("/sync", async (req, res) => {
  try {
    // sync();
    migrationsController.sync();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
});

migrationsRouter.get("/link", async (req, res) => {
  try {
    // link();
    migrationsController.link();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

migrationsRouter.get("/drop", async (req, res) => {
  try {
    // drop();
    migrationsController.drop();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
});

export default migrationsRouter;
