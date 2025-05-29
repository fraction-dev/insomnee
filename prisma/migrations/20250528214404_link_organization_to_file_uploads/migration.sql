/*
  Warnings:

  - Added the required column `organizationId` to the `file_upload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file_upload" ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "file_upload" ADD CONSTRAINT "file_upload_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
