import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import Plan from "./Plan";
import Product from "./Product";

class ProductPlans extends Model {}

ProductPlans.init(
  {},
  { sequelize, modelName: "ProductPlans", tableName: "ProductPlans" }
);

export default ProductPlans;
