-- CreateEnum
CREATE TYPE "organization_products_and_service_status" AS ENUM ('ACTIVE', 'IN_REVIEW', 'DELETED');

-- AlterTable
ALTER TABLE "file_upload" ADD COLUMN     "organizationProductsAndServicesId" TEXT;

-- CreateTable
CREATE TABLE "organization_products_and_services" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER DEFAULT 0,
    "currency" TEXT DEFAULT 'MDL',
    "status" "organization_products_and_service_status" NOT NULL DEFAULT 'ACTIVE',
    "color" TEXT,
    "websiteUrlLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_products_and_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messaging_agent_response_messages" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "response" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messaging_agent_response_messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "file_upload" ADD CONSTRAINT "file_upload_organizationProductsAndServicesId_fkey" FOREIGN KEY ("organizationProductsAndServicesId") REFERENCES "organization_products_and_services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_products_and_services" ADD CONSTRAINT "organization_products_and_services_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_agent_response_messages" ADD CONSTRAINT "messaging_agent_response_messages_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
