import { Router } from "express";
import Plan from "../../models/plan";
import Product from "../../models/product";

const planRouter = Router();

planRouter.get("", async (req, res) => {
  try {
    let allPlans = await Plan.findAll({
      include: [{ model: Product, as: "products" }],
    });

    return res.status(200).json(allPlans);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

planRouter.post("", async (req, res) => {
  try {
    let newPlan = {
      name: `Plan ${Math.round(Math.random() * 100)}`,
    };
    console.log(newPlan);
    let createdPlan = await Plan.create(newPlan);
    let savedPlan = createdPlan;
    // let savedPlan = await newPlan.save();

    return res.status(201).json(savedPlan.toJSON());
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

export default planRouter;
