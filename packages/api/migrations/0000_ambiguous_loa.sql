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
	`genre` text,
	`runtime` integer,
	`overview` text,
	`color` text,
	`current_ranking` integer,
	`tmdb_id` integer,
	`imdb_id` text,
	`tmdb_poster_path` text,
	`tmdb_backdrop_path` text
);
--> statement-breakpoint
CREATE TABLE `movies_to_directors` (
	`movie_id` text,
	`director_id` text,
	PRIMARY KEY(`director_id`, `movie_id`)
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