import { Router } from "express";
import Payment from "../../models/payment";

const paymentsRouter = Router();

paymentsRouter.get("", async (req, res) => {
  try {
    const allPayments = await Payment.findAll({ include: ["subscription"] });
    return res.status(200).json(allPayments);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

paymentsRouter.post("", async (req, res) => {
  try {
    let newPayment = new Payment();
    let savedPayment = await newPayment.save();
    return res.status(201).json(savedPayment.toJSON());
  } catch (error) {
    res.sendStatus(400);
  }
});

export default paymentsRouter;
