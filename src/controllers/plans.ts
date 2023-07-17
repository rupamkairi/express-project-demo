import { Controller, Get, Patch, Post, Route } from "tsoa";
import db from "../db";
import { plans } from "../models/schema/plans";

const drizzle = db();

@Route("/api/plans")
export class PlansController extends Controller {
  @Post("")
  public async createPlan() {
    try {
      const created = await drizzle.insert(plans).values({
        name: "Random" + Math.round(Math.random() * 100),
      });
      return created;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Get("")
  public async getPlans() {
    try {
      const all = await drizzle.query.plans.findFirst({
        with: {
          productsToPlans: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  // @Get("/:id")
  public async findPlans() {
    try {
      const found = await drizzle.select().from(plans);
      return found;
    } catch (error) {
      return error;
    }
  }
}
