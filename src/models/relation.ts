import Payment from "./payment";
import Subscription from "./subscription";

export function link() {
  Subscription.hasMany(Payment, {
    foreignKey: "subscription_id",
    as: "payments",
    onDelete: "CASCADE",
  });
  Payment.belongsTo(Subscription, {
    foreignKey: "subscription_id",
    as: "subscription",
  });
}
