import mongoose from "mongoose";
import { Sequelize } from "sequelize";

const mongoURI = process.env.MONGODBURI!;

// const mongoURI =
//   "mongodb+srv://rupamkairi:Rupam435Kairi@cluster0.5whf3.mongodb.net/cutshort-todo";

export let sequelize: Sequelize;

function dbPGConfig() {
  try {
    const pgDBHost = process.env.DB_HOST!;
    const pgDPort = process.env.DB_PORT!;

    const pgDBName = process.env.DB_NAME!;
    const pgDBUsername = process.env.DB_USER!;
    const pgDBPassword = process.env.DB_PASSWORD!;

    console.log(pgDBHost, pgDPort, pgDBName, pgDBUsername, pgDBPassword);

    // const sequelize = new Sequelize(pgDBName, pgDBUsername, pgDBPassword, {
    //   host: pgDBHost,
    //   port: +pgDPort,
    // });

    sequelize = new Sequelize(pgDBName, pgDBUsername, pgDBPassword, {
      host: pgDBHost,
      port: +pgDPort,
      dialect: "postgres",
    });

    // console.log(sequelize);

    return sequelize;
  } catch (error) {
    throw error;
  }
}

export async function dbConnect() {
  try {
    const sequelize = dbPGConfig();

    await sequelize
      .authenticate()
      .then(() => {
        console.log("Connected to express-project [postgres://localhost:5432]");
      })
      .catch((error) => {
        console.error("Unable to connect to the express-project", error);
      });

    return sequelize;

    // const connection = await mongoose.connect(mongoURI);
    // console.log("MongoDB Connected");
  } catch (error) {
    throw error;
  }
}

function db() {
  const sequelize = dbPGConfig();
  return sequelize;
}

export default db();
