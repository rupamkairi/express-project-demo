import { Controller, Route, Get } from "tsoa";
import { dbMigration, drizzle } from "../db";

@Route("api/migrations")
export class MigrationsController extends Controller {
  @Get("/sync")
  public async sync() {
    await dbMigration();
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
