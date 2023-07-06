import { Router } from "express";
import Plan from "../../models/plan";

const planRouter = Router();

planRouter.get("", async (req, res) => {
  try {
    let allPlans = await Plan.findAll({
      include: ["subscriptions"],
    });
    return res.status(200).json(allPlans);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

planRouter.post("", async (req, res) => {
  try {
    let newPlan = new Plan();
    let savedPlan = await newPlan.save();
    return res.status(201).json(savedPlan.toJSON());
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

export default planRouter;
