CREATE TABLE `replicache_client` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`mutation_id` integer DEFAULT 0 NOT NULL,
	`time_created` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`time_updated` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`time_deleted` integer,
	`client_group_id` text(36) NOT NULL,
	`client_version` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `replicache_client_group` (
	`time_created` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`time_updated` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`time_deleted` integer,
	`id` text(36) PRIMARY KEY NOT NULL,
	`actor` text,
	`cvr_version` integer NOT NULL,
	`client_version` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `replicache_cvr` (
	`id` integer NOT NULL,
	`time_created` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`time_updated` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`time_deleted` integer,
	`data` text NOT NULL,
	`client_group_id` text(36) NOT NULL,
	`client_version` integer NOT NULL,
	PRIMARY KEY(`client_group_id`, `id`)
);
--> statement-breakpoint
ALTER TABLE user_movie ADD `poster_path` text;