ALTER TABLE user ADD `username` text;--> statement-breakpoint
ALTER TABLE user ADD `email` text;--> statement-breakpoint
ALTER TABLE user ADD `email_verified` integer;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);