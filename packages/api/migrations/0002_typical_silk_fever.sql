CREATE TABLE `tspdt_oauth_account` (
	`provider_id` text NOT NULL,
	`provider_user_id` text NOT NULL,
	`user_id` text NOT NULL,
	PRIMARY KEY(`provider_id`, `provider_user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `tspdt_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tspdt_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `tspdt_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tspdt_user_movie` (
	`time_created` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`time_updated` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`user_id` text NOT NULL,
	`movie_id` text NOT NULL,
	`poster_path` text,
	`time_seen` integer,
	`time_favorited` integer,
	`time_added` integer,
	PRIMARY KEY(`movie_id`, `user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `tspdt_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`movie_id`) REFERENCES `tspdt_movies`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tspdt_user` (
	`time_created` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`time_updated` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`username` text,
	`email` text,
	`email_verified` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tspdt_user_email_unique` ON `tspdt_user` (`email`);