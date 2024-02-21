CREATE TABLE `user_movie` (
	`id` text(21) NOT NULL,
	`user_id` text(21) NOT NULL,
	`time_created` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`time_updated` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`time_deleted` integer,
	`movie_id` text(21) NOT NULL,
	`time_seen` integer,
	`time_favorited` integer,
	`time_added` integer,
	PRIMARY KEY(`movie_id`, `user_id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text(21) PRIMARY KEY NOT NULL,
	`time_created` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`time_updated` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`time_deleted` integer
);
