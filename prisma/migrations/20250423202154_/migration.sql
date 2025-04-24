/*
  Warnings:

  - You are about to drop the column `userId` on the `organization_integration_instagram` table. All the data in the column will be lost.
  - Added the required column `instagramUserId` to the `organization_integration_instagram` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organization_integration_instagram" DROP COLUMN "userId",
ADD COLUMN     "instagramUserId" INTEGER NOT NULL;
