import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import Product from "./Product";

class Plan extends Model {}

Plan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    // created_at: { type: DataTypes.DATE, defaultValue: Date.now() },
    // created_by: { type: DataTypes.INTEGER, defaultValue: 1 },
    // updated_at: { type: DataTypes.DATE, allowNull: true },
    // updated_by: { type: DataTypes.INTEGER, allowNull: true },
  },
  { sequelize, modelName: "Plan", tableName: "Plan" }
);

export default Plan;
