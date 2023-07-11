import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // created_at: { type: DataTypes.DATE, defaultValue: Date.now() },
    // created_by: { type: DataTypes.INTEGER, defaultValue: 1 },
    // updated_at: { type: DataTypes.DATE, allowNull: true },
    // updated_by: { type: DataTypes.INTEGER, allowNull: true },
  },
  { sequelize, modelName: "Product", tableName: "product" }
);

// const Product = sequelize.define("Product", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
// });

export default Product;
