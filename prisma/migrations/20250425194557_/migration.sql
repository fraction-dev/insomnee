/*
  Warnings:

  - A unique constraint covering the columns `[instagramUserId]` on the table `organization_integration_instagram` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "organization_integration_instagram" ADD COLUMN     "instagramBusinessId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "organization_integration_instagram_instagramUserId_key" ON "organization_integration_instagram"("instagramUserId");
