import { Controller, Get, Patch, Post, Route } from "tsoa";
import db from "../db";
import { products } from "../models/schema/products";

const drizzle = db();

@Route("/api/products")
export class ProductsController extends Controller {
  @Post("")
  public async createProduct() {
    try {
      const created = await drizzle.insert(products).values({
        name: "Random" + Math.round(Math.random() * 100),
      });
      return created;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Get("")
  public async getProducts() {
    try {
      const all = await drizzle.query.products.findMany({
        with: {
          productsToPlans: true,
        },
      });
      return all;
    } catch (error) {
      return error;
    }
  }

  // @Get("/:id")
  public async findProducts() {
    try {
      const found = await drizzle.select().from(products);
      return found;
    } catch (error) {
      return error;
    }
  }
}
