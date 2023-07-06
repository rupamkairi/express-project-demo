import { Router } from "express";
import Subscription from "../../models/subscription";

const subscriptionsRouter = Router();

subscriptionsRouter.get("", async (req, res) => {
  try {
    let allSubscriptions = await Subscription.findAll({
      include: ["payments", "user", "plan"],
    });
    return res.status(200).json(allSubscriptions);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

subscriptionsRouter.post("", async (req, res) => {
  try {
    let newSubscription = new Subscription();
    let savedSubscription = await newSubscription.save();
    return res.status(201).json(savedSubscription.toJSON());
  } catch (error) {
    res.sendStatus(400);
  }
});

export default subscriptionsRouter;
