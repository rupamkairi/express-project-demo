import { InferModel, relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import productsToPlans from "./product-plans";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});

export const productsRelations = relations(products, ({ many }) => ({
  productsToPlans: many(productsToPlans),
}));

export type Product = InferModel<typeof products>;
