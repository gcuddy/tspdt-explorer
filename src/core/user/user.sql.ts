import { sqliteTable } from "drizzle-orm/sqlite-core";
import { id, timestamps } from "@/utils/sql";

export const user = sqliteTable("user", {
  ...id,
  ...timestamps,
});
