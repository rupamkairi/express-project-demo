import { Router } from "express";
import Product from "../../models/Product";

const productsRouter = Router();

productsRouter.get("", async (req, res) => {
  try {
    let allProducts = await Product.findAll({
      include: ["plans"],
    });

    return res.status(200).json(allProducts);
  } catch (error) {
    res.sendStatus(400);
  }
});

productsRouter.post("", async (req, res) => {
  try {
    let newProduct = {
      name: `Product ${Math.round(Math.random() * 100)}`,
    };
    console.log(newProduct);
    let createdProduct = await Product.create(newProduct);
    let savedProduct = (await createdProduct.save()).toJSON();

    return res.status(201).json(savedProduct);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

export default productsRouter;
