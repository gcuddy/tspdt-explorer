CREATE TABLE `directors` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`tmdb_id` integer
);
--> statement-breakpoint
CREATE TABLE `movies` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`year` integer NOT NULL,
	`country` text,
	`color` text,
	`tmdb_id` integer,
	`imdb_id` text,
	`tmdb_poster_path` text,
	`tmdb_backdrop_path` text
);
--> statement-breakpoint
CREATE TABLE `movies_to_directors` (
	`movie_id` text,
	`director_id` text,
	PRIMARY KEY(`director_id`, `movie_id`),
	FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`director_id`) REFERENCES `directors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `rankings` (
	`id` integer PRIMARY KEY NOT NULL,
	`movie_id` text,
	`year` integer NOT NULL,
	`ranking` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `directors_tmdb_id_unique` ON `directors` (`tmdb_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `movies_tmdb_id_unique` ON `movies` (`tmdb_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `movies_imdb_id_unique` ON `movies` (`imdb_id`);--> statement-breakpoint
CREATE INDEX `year_idx` ON `movies` (`year`);--> statement-breakpoint
CREATE INDEX `tmdb_id_idx` ON `movies` (`tmdb_id`);--> statement-breakpoint
CREATE INDEX `movie_id_idx` ON `rankings` (`movie_id`);