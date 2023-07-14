import mongoose from "mongoose";
import { Sequelize } from "sequelize";
import {
  drizzle as DrizzleORM,
  PostgresJsDatabase,
} from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const mongoURI = process.env.MONGODBURI!;

// const mongoURI =
//   "mongodb+srv://rupamkairi:Rupam435Kairi@cluster0.5whf3.mongodb.net/cutshort-todo";

const pgURI = "postgres://postgres:password@localhost:5432/express-project";

export let sequelize: Sequelize;
export let drizzle: PostgresJsDatabase;

function dbPGConfig() {
  try {
    const pgDBHost = process.env.DB_HOST!;
    const pgDPort = process.env.DB_PORT!;

    const pgDBName = process.env.DB_NAME!;
    const pgDBUsername = process.env.DB_USER!;
    const pgDBPassword = process.env.DB_PASSWORD!;

    console.log(pgDBHost, pgDPort, pgDBName, pgDBUsername, pgDBPassword);

    // sequelize = new Sequelize(pgDBName, pgDBUsername, pgDBPassword, {
    //   host: pgDBHost,
    //   port: +pgDPort,
    //   dialect: "postgres",
    // });

    // return sequelize;

    const client = postgres({
      host: pgDBHost,
      port: +pgDPort,
      db: pgDBName,
      user: pgDBUsername,
      pass: pgDBPassword,
    });
    const drizzle = DrizzleORM(client);
    return drizzle;
  } catch (error) {
    throw error;
  }
}

export async function dbConnect() {
  try {
    // const sequelize = dbPGConfig();
    // await sequelize
    //   .authenticate()
    //   .then(() => {
    //     console.log("Connected to express-project [postgres://localhost:5432]");
    //   })
    //   .catch((error) => {
    //     console.error("Unable to connect to the express-project", error);
    //   });
    // return sequelize;
    //
    const drizzle = dbPGConfig();
    migrate(drizzle, {
      migrationsFolder: "./src/drizzle",
      migrationsTable: "drizzle_migrations",
    });
    //
    // const connection = await mongoose.connect(mongoURI);
    // console.log("MongoDB Connected");
  } catch (error) {
    throw error;
  }
}

export default function db() {
  return dbPGConfig();
}
