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
--> statement-breakpoint
CREATE TABLE `movies_to_directors` (
	`movie_id` integer NOT NULL,
	`director_id` integer NOT NULL,
	PRIMARY KEY(`director_id`, `movie_id`),
	FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`director_id`) REFERENCES `directors`(`id`) ON UPDATE no action ON DELETE no action
);
