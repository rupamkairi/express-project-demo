import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import Plan from "./plan";
import Product from "./product";

class ProductPlans extends Model {}

ProductPlans.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      // unique: true,
      references: {
        model: Product,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    plan_id: {
      type: DataTypes.INTEGER,
      // unique: true,
      references: {
        model: Plan,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    // created_at: { type: DataTypes.DATE, defaultValue: Date.now() },
    // created_by: { type: DataTypes.INTEGER, defaultValue: 1 },
    // updated_at: { type: DataTypes.DATE, allowNull: true },
    // updated_by: { type: DataTypes.INTEGER, allowNull: true },
  },
  { sequelize, modelName: "ProductPlans", tableName: "product_plans" }
);

export default ProductPlans;
