import { Router } from "express";
import { ProductsController } from "../controllers/products";

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.post("/", async (req, res) => {
  try {
    const result = await productsController.createProduct();
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

productsRouter.get("/", async (req, res) => {
  try {
    let result: any = null;
    if (Object.keys(req.query).length)
      result = await productsController.findProducts();
    else result = await productsController.getProducts();
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default productsRouter;
