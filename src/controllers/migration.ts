import Payment from "../models/payment";
import Plan from "../models/plan";
import Product from "../models/product";
import { linkTables } from "../models/relation";
import Subscription from "../models/subscription";
import User from "../models/user";

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
    Plan.sync();
    Product.sync();

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
    Plan.drop();
    Product.drop();

    return { message: "OK" };
  }
}
