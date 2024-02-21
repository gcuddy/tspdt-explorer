import { sqliteTable, text, blob, integer } from "drizzle-orm/sqlite-core";
import { id, timestamps } from "@/utils/sql";

export const user = sqliteTable("user", {
  ...id,
  ...timestamps,
  username: text("username"),
  email: text("email").unique(),
  emailVerified: integer("email_verified", {
    mode: "boolean",
  }),
});

export const session = sqliteTable("user_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  activeExpires: integer("active_expires").notNull(),
  idleExpires: integer("idle_expires").notNull(),
});

export const key = sqliteTable("user_key", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  hashedPassword: text("hashed_password"),
});
