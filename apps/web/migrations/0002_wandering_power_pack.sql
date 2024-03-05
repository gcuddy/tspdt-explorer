--> statement-breakpoint
CREATE TABLE `movies_to_directors` (
  `movie_id` text NOT NULL,
  `director_id` text NOT NULL,
  PRIMARY KEY(`director_id`, `movie_id`),
  FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON UPDATE no action ON DELETE no action,
  FOREIGN KEY (`director_id`) REFERENCES `directors`(`id`) ON UPDATE no action ON DELETE no action
);
