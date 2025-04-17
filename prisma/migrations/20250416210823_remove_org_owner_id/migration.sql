/*
  Warnings:

  - You are about to drop the column `ownerId` on the `organization` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "organization_ownerId_key";

-- AlterTable
ALTER TABLE "organization" DROP COLUMN "ownerId";
