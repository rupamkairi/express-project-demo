import { Controller, Route, Get } from "tsoa";
import { drizzle } from "../db";

interface MigrationsResponse {
  message: string;
}

@Route("api/migrations")
export class MigrationsController extends Controller {
  @Get("/sync")
  public async sync(): Promise<MigrationsResponse> {
    console.log(drizzle);
    return { message: "OK" };
  }

  @Get("/link")
  public async link() {
    return { message: "OK" };
  }

  @Get("/drop")
  public async drop() {
    return { message: "OK" };
  }
}
