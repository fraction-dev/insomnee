/*
  Warnings:

  - Added the required column `instagramUsername` to the `organization_integration_instagram` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organization_integration_instagram" ADD COLUMN     "instagramUsername" TEXT NOT NULL;
