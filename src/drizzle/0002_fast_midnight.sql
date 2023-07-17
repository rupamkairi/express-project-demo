CREATE TABLE IF NOT EXISTS "products_to_plans" (
	"product_id" integer NOT NULL,
	"plan_id" integer NOT NULL,
	CONSTRAINT products_to_plans_product_id_plan_id PRIMARY KEY("product_id","plan_id")
);
--> statement-breakpoint
DROP TABLE "product_plans";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products_to_plans" ADD CONSTRAINT "products_to_plans_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products_to_plans" ADD CONSTRAINT "products_to_plans_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
