PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_message` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text NOT NULL,
	`from_user_id` text NOT NULL,
	`to_user_id` text NOT NULL,
	`created_at` text DEFAULT '2026-10-22T15:45:41.773Z' NOT NULL,
	FOREIGN KEY (`from_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`to_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_message`("id", "content", "from_user_id", "to_user_id", "created_at") SELECT "id", "content", "from_user_id", "to_user_id", "created_at" FROM `message`;--> statement-breakpoint
DROP TABLE `message`;--> statement-breakpoint
ALTER TABLE `__new_message` RENAME TO `message`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text,
	`likes` integer DEFAULT 0 NOT NULL,
	`dislikes` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT '2026-10-22T15:45:41.776Z' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_posts`("id", "title", "content", "likes", "dislikes", "created_at") SELECT "id", "title", "content", "likes", "dislikes", "created_at" FROM `posts`;--> statement-breakpoint
DROP TABLE `posts`;--> statement-breakpoint
ALTER TABLE `__new_posts` RENAME TO `posts`;--> statement-breakpoint
CREATE TABLE `__new_realm` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`owner_id` text NOT NULL,
	`created_at` text DEFAULT '2026-10-22T15:45:41.779Z' NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_realm`("id", "name", "description", "owner_id", "created_at") SELECT "id", "name", "description", "owner_id", "created_at" FROM `realm`;--> statement-breakpoint
DROP TABLE `realm`;--> statement-breakpoint
ALTER TABLE `__new_realm` RENAME TO `realm`;--> statement-breakpoint
CREATE TABLE `__new_user_follows_realm` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`realm_id` text NOT NULL,
	`created_at` text DEFAULT '2026-10-22T15:45:41.779Z' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`realm_id`) REFERENCES `realm`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_user_follows_realm`("id", "user_id", "realm_id", "created_at") SELECT "id", "user_id", "realm_id", "created_at" FROM `user_follows_realm`;--> statement-breakpoint
DROP TABLE `user_follows_realm`;--> statement-breakpoint
ALTER TABLE `__new_user_follows_realm` RENAME TO `user_follows_realm`;