CREATE TABLE `breach_members` (
	`id` text PRIMARY KEY NOT NULL,
	`room_id` text NOT NULL,
	`token_hash` text NOT NULL,
	`name` text NOT NULL,
	`role` text DEFAULT 'pathfinder' NOT NULL,
	`ready` integer DEFAULT 0 NOT NULL,
	`last_seen` integer NOT NULL,
	`joined_at` integer NOT NULL,
	`seq` integer DEFAULT 0 NOT NULL,
	`state` text DEFAULT '{}' NOT NULL,
	`actions` text DEFAULT '[]' NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES `breach_rooms`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `breach_member_token` ON `breach_members` (`token_hash`);--> statement-breakpoint
CREATE INDEX `breach_members_room` ON `breach_members` (`room_id`);--> statement-breakpoint
CREATE TABLE `breach_rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`invite_hash` text NOT NULL,
	`host_id` text NOT NULL,
	`creator_hash` text NOT NULL,
	`status` text DEFAULT 'lobby' NOT NULL,
	`world` text DEFAULT 'null' NOT NULL,
	`world_seq` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`host_seen` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `breach_invite_unique` ON `breach_rooms` (`invite_hash`);--> statement-breakpoint
CREATE INDEX `breach_creator_time` ON `breach_rooms` (`creator_hash`,`created_at`);--> statement-breakpoint
CREATE TABLE `breach_signals` (
	`id` text PRIMARY KEY NOT NULL,
	`room_id` text NOT NULL,
	`sender_id` text NOT NULL,
	`target_id` text NOT NULL,
	`payload` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES `breach_rooms`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `breach_signal_target` ON `breach_signals` (`room_id`,`target_id`,`created_at`);