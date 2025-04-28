-- AlterTable
ALTER TABLE "organization_messaging_agent" ADD COLUMN     "integrationId" TEXT;

-- AddForeignKey
ALTER TABLE "organization_messaging_agent" ADD CONSTRAINT "organization_messaging_agent_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "organization_integration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
