import { sequelize } from "../db";
import Payment from "../models/Payment";
import Plan from "../models/Plan";
import Product from "../models/Product";
import ProductPlans from "../models/ProductPlans";
import { linkTables } from "../models/relation";
import Subscription from "../models/Subscription";
import User from "../models/User";

import { Controller, Route, Get } from "tsoa";

interface MigrationsResponse {
  message: string;
}

@Route("api/migrations")
export class MigrationsController extends Controller {
  @Get("/sync")
  public async sync(): Promise<MigrationsResponse> {
    User.sync();
    Subscription.sync();
    Payment.sync();
    Product.sync();
    Plan.sync();
    ProductPlans.sync();

    return { message: "OK" };
  }

  @Get("/link")
  public async link() {
    linkTables();

    return { message: "OK" };
  }

  @Get("/drop")
  public async drop() {
    User.drop();
    Subscription.drop();
    Payment.drop();
    Product.drop();
    Plan.drop();
    ProductPlans.drop();

    sequelize.drop();

    return { message: "OK" };
  }
}
