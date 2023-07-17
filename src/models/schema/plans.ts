import { InferModel, relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import productsToPlans from "./product-plans";

export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});

export const plansRelations = relations(plans, ({ many }) => ({
  productsToPlans: many(productsToPlans),
}));

export type Plan = InferModel<typeof plans>;
