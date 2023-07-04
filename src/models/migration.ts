import Payment from "./payment";
import Product from "./product";
import Subscription from "./subscription";
import User from "./user";

export function sync() {
  User.sync();
  Subscription.sync();
  Payment.sync();
  Product.sync();
}

export function drop() {
  User.drop();
  Subscription.drop();
  Payment.drop();
  Product.drop();
}
