/*
 SQLite does not support "Set not null to column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/

PRAGMA foreign_keys = off;

BEGIN TRANSACTION;

ALTER TABLE movies RENAME TO _movies_old;

CREATE TABLE `movies` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`year` integer,
	`tmdb_id` integer,
    `tspdt_id` integer
);


INSERT INTO movies (id, title, year, tmdb_id, tspdt_id)
SELECT id, title, year, tmdb_id, tspdt_id
FROM _movies_old;

COMMIT;

PRAGMA foreign_keys = on;
