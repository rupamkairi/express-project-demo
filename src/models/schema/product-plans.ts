import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { products } from "./products";
import { plans } from "./plans";

export const productsToPlans = pgTable(
  "products_to_plans",
  {
    productId: integer("product_id")
      .notNull()
      .references(() => products.id),
    planId: integer("plan_id")
      .notNull()
      .references(() => plans.id),
  },
  (t) => ({
    pk: primaryKey(t.productId, t.planId),
  })
);

export const productsToPlansRelations = relations(
  productsToPlans,
  ({ one }) => ({
    product: one(products, {
      fields: [productsToPlans.productId],
      references: [products.id],
    }),
    plan: one(plans, {
      fields: [productsToPlans.planId],
      references: [plans.id],
    }),
  })
);

export default productsToPlans;
