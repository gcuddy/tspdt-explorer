CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			);
CREATE TABLE `directors` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`tmdb_id` integer
);
CREATE TABLE `movies` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`year` integer,
	`tmdb_id` integer
, `tspdt_id` integer);
CREATE TABLE `movies_to_directors` (
  `movie_id` text NOT NULL,
  `director_id` text NOT NULL,
  PRIMARY KEY(`director_id`, `movie_id`),
  FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON UPDATE no action ON DELETE no action,
  FOREIGN KEY (`director_id`) REFERENCES `directors`(`id`) ON UPDATE no action ON DELETE no action
);
CREATE TABLE `rankings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`movie_id` text,
	`year` integer,
	`ranking` integer
);
