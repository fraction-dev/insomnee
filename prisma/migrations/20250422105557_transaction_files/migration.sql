-- AlterTable
ALTER TABLE "file_upload" ADD COLUMN     "organizationTransactionId" TEXT;

-- AlterTable
ALTER TABLE "organization_transaction" ADD COLUMN     "files" TEXT[];

-- AddForeignKey
ALTER TABLE "file_upload" ADD CONSTRAINT "file_upload_organizationTransactionId_fkey" FOREIGN KEY ("organizationTransactionId") REFERENCES "organization_transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
