import { Router } from "express";
import Product from "../../models/product";

const productsRouter = Router();

productsRouter.get("", async (req, res) => {
  try {
  } catch (error) {
    res.sendStatus(400);
  }
});

productsRouter.post("", async (req, res) => {
  try {
    let newProduct = new Product();
    let savedProdcut = await newProduct.save();
    return res.status(201).json(savedProdcut.toJSON());
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

export default productsRouter;
