import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import Payment from "./payment";

class Subscription extends Model {}

Subscription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    created_at: { type: DataTypes.DATE, defaultValue: Date.now() },
    created_by: { type: DataTypes.INTEGER, defaultValue: 1 },
    updated_at: { type: DataTypes.DATE, allowNull: true },
    updated_by: { type: DataTypes.INTEGER, allowNull: true },
  },
  { sequelize, modelName: "Subscription", tableName: "subscription" }
);

Subscription.hasMany(Payment, {
  foreignKey: "subscription_id",
  as: "payments",
  onDelete: "CASCADE",
});
Payment.belongsTo(Subscription, {
  foreignKey: "subscription_id",
  as: "subscription",
});

export default Subscription;
