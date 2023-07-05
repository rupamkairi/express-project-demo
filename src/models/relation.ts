import Payment from "./payment";
import Subscription from "./subscription";
import User from "./user";

export function linkTables() {
  Subscription.hasMany(Payment, {
    foreignKey: "subscription_id",
    as: "payments",
    // onDelete: "CASCADE",
  });
  Payment.belongsTo(Subscription, {
    foreignKey: "subscription_id",
    as: "subscription",
  });

  User.hasOne(Subscription, {
    foreignKey: "user_id",
    as: "subscription",
    // onDelete: "CASCADE",
  });
  Subscription.belongsTo(User, { foreignKey: "user_id", as: "user" });
}
