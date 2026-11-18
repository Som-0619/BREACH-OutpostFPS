import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core';
export const rooms = sqliteTable('breach_rooms', {
 id: text('id').primaryKey(), inviteHash: text('invite_hash').notNull(), hostId: text('host_id').notNull(),
 creatorHash: text('creator_hash').notNull(), status: text('status').notNull().default('lobby'),
 mode:text('mode').notNull().default('coop'),
 world: text('world').notNull().default('null'), worldSeq: integer('world_seq').notNull().default(0),
 createdAt: integer('created_at').notNull(), hostSeen: integer('host_seen').notNull(), expiresAt: integer('expires_at').notNull(),
}, t=>[uniqueIndex('breach_invite_unique').on(t.inviteHash), index('breach_creator_time').on(t.creatorHash,t.createdAt)]);
export const members = sqliteTable('breach_members', {
 id:text('id').primaryKey(), roomId:text('room_id').notNull().references(()=>rooms.id,{onDelete:'cascade'}),
 tokenHash:text('token_hash').notNull(), name:text('name').notNull(), role:text('role').notNull().default('pathfinder'),
 ready:integer('ready').notNull().default(0), lastSeen:integer('last_seen').notNull(), joinedAt:integer('joined_at').notNull(),
 seq:integer('seq').notNull().default(0), state:text('state').notNull().default('{}'), actions:text('actions').notNull().default('[]'),
}, t=>[uniqueIndex('breach_member_token').on(t.tokenHash),index('breach_members_room').on(t.roomId)]);
export const signals=sqliteTable('breach_signals',{
 id:text('id').primaryKey(),roomId:text('room_id').notNull().references(()=>rooms.id,{onDelete:'cascade'}),
 senderId:text('sender_id').notNull(),targetId:text('target_id').notNull(),payload:text('payload').notNull(),createdAt:integer('created_at').notNull(),
},t=>[index('breach_signal_target').on(t.roomId,t.targetId,t.createdAt)]);
