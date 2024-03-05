CREATE TABLE `user_movie` (
	`id` text(21) NOT NULL,
	`user_id` text(21) NOT NULL,
	`time_created` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`time_updated` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`time_deleted` integer,
	`movie_id` text(21) NOT NULL,
	`poster_path` text,
	`time_seen` integer,
	`time_favorited` integer,
	`time_added` integer,
	`last_modified_version` integer NOT NULL,
	PRIMARY KEY(`movie_id`, `user_id`)
);
--> statement-breakpoint
CREATE TABLE `replicache_client` (
	`id` text(21) PRIMARY KEY NOT NULL,
	`client_group_id` text(36) NOT NULL,
	`last_mutation_id` integer DEFAULT 0 NOT NULL,
	`last_modified_version` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `replicache_client_group` (
	`id` text(21) NOT NULL,
	`user_id` text(21) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `replicache_space` (
	`id` text(21) PRIMARY KEY NOT NULL,
	`version` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text(21) PRIMARY KEY NOT NULL,
	`time_created` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`time_updated` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`time_deleted` integer
);
--> statement-breakpoint
ALTER TABLE movies ADD `runtime` integer;--> statement-breakpoint
CREATE INDEX `runtime_idx` ON `movies` (`runtime`);
