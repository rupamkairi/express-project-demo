CREATE TABLE IF NOT EXISTS "product_plans" (
	"product_id" integer NOT NULL,
	"plan_id" integer NOT NULL,
	CONSTRAINT product_plans_product_id_plan_id PRIMARY KEY("product_id","plan_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_plans" ADD CONSTRAINT "product_plans_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_plans" ADD CONSTRAINT "product_plans_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
