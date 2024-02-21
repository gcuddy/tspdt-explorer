DROP TABLE `user_movie`;--> statement-breakpoint
DROP TABLE `replicache_client`;--> statement-breakpoint
DROP TABLE `replicache_client_group`;--> statement-breakpoint
DROP TABLE `replicache_cvr`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
DROP INDEX IF EXISTS `runtime_idx`;--> statement-breakpoint
ALTER TABLE `movies` DROP COLUMN `runtime`;