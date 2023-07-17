import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { products } from "./products";
import { plans } from "./plans";

const productToPlans = pgTable(
  "product_plans",
  {
    product_id: integer("product_id")
      .notNull()
      .references(() => products.id),
    plan_id: integer("plan_id")
      .notNull()
      .references(() => plans.id),
  },
  (t) => ({
    pk: primaryKey(t.product_id, t.plan_id),
  })
);

export const productToPlansRelations = relations(productToPlans, ({ one }) => ({
  product: one(products, {
    fields: [productToPlans.product_id],
    references: [products.id],
  }),
  plan: one(plans, {
    fields: [productToPlans.plan_id],
    references: [plans.id],
  }),
}));

export default productToPlans;
