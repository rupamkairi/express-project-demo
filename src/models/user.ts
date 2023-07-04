import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    // subscription_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    created_at: { type: DataTypes.DATE, defaultValue: Date.now() },
    created_by: { type: DataTypes.INTEGER, defaultValue: 1 },
    updated_at: { type: DataTypes.DATE, allowNull: true },
    updated_by: { type: DataTypes.INTEGER, allowNull: true },
  },
  { sequelize, modelName: "User", tableName: "user" }
);

export default User;
