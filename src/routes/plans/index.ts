import { Router } from "express";
import Plan from "../../models/Plan";
// import Plan from "../../models/Plan";
// import Product from "../../models/Product";

const planRouter = Router();

planRouter.get("", async (req, res) => {
  try {
    let allPlans = await Plan.findAll({
      include: ["products"],
    });

    return res.status(200).json(allPlans);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

planRouter.post("", async (req, res) => {
  try {
    let newPlan = {};
    console.log(newPlan);
    let createdPlan = await Plan.create(newPlan);
    let savedPlan = (await createdPlan.save()).toJSON();

    return res.status(201).json(savedPlan);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

export default planRouter;
