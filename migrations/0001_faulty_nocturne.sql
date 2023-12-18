CREATE TABLE `rankings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`movie_id` integer,
	`year` integer,
	`ranking` integer
);
--> statement-breakpoint
ALTER TABLE movies ADD `tspdt_id` integer;