-- CreateEnum
CREATE TYPE "file_upload_type" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "file_upload_access_type" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "file_upload" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "file_upload_type" NOT NULL,
    "mimeType" TEXT NOT NULL,
    "accessType" "file_upload_access_type" NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "file_upload_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "file_upload" ADD CONSTRAINT "file_upload_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
