-- CreateEnum
CREATE TYPE "file_upload_status" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "file_upload" ADD COLUMN     "status" "file_upload_status" NOT NULL DEFAULT 'PENDING';
