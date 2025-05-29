-- AlterTable
ALTER TABLE "file_upload" ADD COLUMN     "description" TEXT DEFAULT '',
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "title" TEXT DEFAULT '';
