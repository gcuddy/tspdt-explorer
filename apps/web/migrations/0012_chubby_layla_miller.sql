ALTER TABLE directors ADD `last_modified_version` integer NOT NULL;--> statement-breakpoint
ALTER TABLE movies ADD `last_modified_version` integer NOT NULL;--> statement-breakpoint
ALTER TABLE rankings ADD `last_modified_version` integer NOT NULL;