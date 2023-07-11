import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

class Subscription extends Model {}

Subscription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    plan_id: {
      type: DataTypes.INTEGER,
    },
    // created_at: { type: DataTypes.DATE, defaultValue: Date.now() },
    // created_by: { type: DataTypes.INTEGER, defaultValue: 1 },
    // updated_at: { type: DataTypes.DATE, allowNull: true },
    // updated_by: { type: DataTypes.INTEGER, allowNull: true },
  },
  { sequelize, modelName: "Subscription", tableName: "subscription" }
);

export default Subscription;
