import Payment from "./payment";
import Subscription from "./subscription";
import Plan from "./plan";
import User from "./user";
import Product from "./product";
import ProductPlans from "./product_plans";

export function linkTables() {
  // Subscription.hasMany(Payment, {
  //   foreignKey: "subscription_id",
  //   as: "payments",
  //   // onDelete: "CASCADE",
  // });
  // Payment.belongsTo(Subscription, {
  //   foreignKey: "subscription_id",
  //   as: "subscription",
  // });

  // User.hasOne(Subscription, {
  //   foreignKey: "user_id",
  //   as: "subscription",
  //   // onDelete: "CASCADE",
  // });
  // Subscription.belongsTo(User, { foreignKey: "user_id", as: "user" });

  // Plan.hasMany(Subscription, {
  //   foreignKey: "plan_id",
  //   as: "subscriptions",
  //   // onDelete: "CASCADE",
  // });
  // Subscription.belongsTo(Plan, { foreignKey: "plan_id", as: "plan" });

  Product.belongsToMany(Plan, {
    through: ProductPlans,
    as: "plans",
    // foreignKey: "product_id",
  });

  Plan.belongsToMany(Product, {
    through: ProductPlans,
    as: "products",
    // foreignKey: "plan_id",
  });
}
