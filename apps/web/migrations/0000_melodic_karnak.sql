CREATE TABLE `directors` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`tmdb_id` integer
);
--> statement-breakpoint
CREATE TABLE `movies` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`year` integer,
	`tmdb_id` integer
);