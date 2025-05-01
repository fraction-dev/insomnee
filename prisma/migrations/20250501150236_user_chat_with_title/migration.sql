/*
  Warnings:

  - Added the required column `title` to the `user_chats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_chats" ADD COLUMN     "title" TEXT NOT NULL;
