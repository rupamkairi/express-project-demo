import { Router } from "express";
import Product from "../../models/product";
import Plan from "../../models/plan";

const productsRouter = Router();

productsRouter.get("", async (req, res) => {
  try {
    let allProducts = await Product.findAll({
      include: [{ model: Plan, as: "plans" }],
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
    let savedProduct = createdProduct;
    // let savedProduct = await newProduct.save();

    return res.status(201).json(savedProduct.toJSON());
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

export default productsRouter;
