import { Router } from "express";
import { PlansController } from "../controllers/plans";

const plansRouter = Router();
const plansController = new PlansController();

plansRouter.post("/", async (req, res) => {
  try {
    const result = await plansController.createPlan();
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

plansRouter.get("/", async (req, res) => {
  try {
    let result: any = null;
    if (Object.keys(req.query).length)
      result = await plansController.findPlans();
    else result = await plansController.getPlans();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default plansRouter;
