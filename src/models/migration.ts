import Payment from "./payment";
import Product from "./product";
import Subscription from "./subscription";

export function sync() {
  Subscription.sync();
  Payment.sync();
  Product.sync();
}

export function drop() {
  Subscription.drop();
  Payment.drop();
  Product.drop();
}
