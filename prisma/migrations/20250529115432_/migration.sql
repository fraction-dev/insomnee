/*
  Warnings:

  - The values [PENDING] on the enum `file_upload_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "file_upload_status_new" AS ENUM ('PROCESSING', 'COMPLETED', 'FAILED');
ALTER TABLE "file_upload" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "file_upload" ALTER COLUMN "status" TYPE "file_upload_status_new" USING ("status"::text::"file_upload_status_new");
ALTER TYPE "file_upload_status" RENAME TO "file_upload_status_old";
ALTER TYPE "file_upload_status_new" RENAME TO "file_upload_status";
DROP TYPE "file_upload_status_old";
ALTER TABLE "file_upload" ALTER COLUMN "status" SET DEFAULT 'COMPLETED';
COMMIT;
