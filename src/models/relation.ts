import Payment from "./Payment";
import Subscription from "./Subscription";
import Plan from "./Plan";
import User from "./User";
import Product from "./Product";
import ProductPlans from "./ProductPlans";

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
  //
  // User.hasOne(Subscription, {
  //   foreignKey: "user_id",
  //   as: "subscription",
  //   // onDelete: "CASCADE",
  // });
  // Subscription.belongsTo(User, { foreignKey: "user_id", as: "user" });
  //
  // Plan.hasMany(Subscription, {
  //   foreignKey: "plan_id",
  //   as: "subscriptions",
  //   // onDelete: "CASCADE",
  // });
  // Subscription.belongsTo(Plan, { foreignKey: "plan_id", as: "plan" });
  //
  // Product.belongsToMany(Plan, {
  //   through: "ProductPlans",
  //   as: "plans",
  // });
  // Plan.belongsToMany(Product, {
  //   through: "ProductPlans",
  //   as: "products",
  // });

  ProductPlans.hasMany(Plan);
  Plan.belongsTo(ProductPlans);

  ProductPlans.hasMany(Product);
  Product.belongsTo(ProductPlans);

  Plan.belongsToMany(Product, { through: ProductPlans });
  Product.belongsToMany(Plan, { through: ProductPlans });
}
