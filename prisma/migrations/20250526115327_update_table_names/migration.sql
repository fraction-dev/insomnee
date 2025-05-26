/*
  Warnings:

  - You are about to drop the column `organizationProductsAndServicesId` on the `file_upload` table. All the data in the column will be lost.
  - You are about to drop the column `organizationTransactionId` on the `file_upload` table. All the data in the column will be lost.
  - You are about to drop the `organization_ai_usage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization_integration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization_integration_instagram` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization_messaging_agent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization_products_and_services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization_transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization_transaction_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "integration_type" AS ENUM ('INSTAGRAM', 'FACEBOOK', 'WHATSAPP', 'TWITTER', 'TELEGRAM', 'SIMPALS');

-- CreateEnum
CREATE TYPE "integration_voice_message_service" AS ENUM ('ELEVENLABS');

-- CreateEnum
CREATE TYPE "voice_message_service" AS ENUM ('SARAH', 'ALEX', 'DOMINIQUE', 'EMMA', 'SOPHIA', 'LUCIA');

-- CreateEnum
CREATE TYPE "products_and_service_status" AS ENUM ('ACTIVE', 'IN_REVIEW', 'DELETED');

-- DropForeignKey
ALTER TABLE "file_upload" DROP CONSTRAINT "file_upload_organizationProductsAndServicesId_fkey";

-- DropForeignKey
ALTER TABLE "file_upload" DROP CONSTRAINT "file_upload_organizationTransactionId_fkey";

-- DropForeignKey
ALTER TABLE "organization_ai_usage" DROP CONSTRAINT "organization_ai_usage_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "organization_integration" DROP CONSTRAINT "organization_integration_instagramIntegrationId_fkey";

-- DropForeignKey
ALTER TABLE "organization_integration" DROP CONSTRAINT "organization_integration_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "organization_messaging_agent" DROP CONSTRAINT "organization_messaging_agent_integrationId_fkey";

-- DropForeignKey
ALTER TABLE "organization_messaging_agent" DROP CONSTRAINT "organization_messaging_agent_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "organization_products_and_services" DROP CONSTRAINT "organization_products_and_services_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "organization_transaction" DROP CONSTRAINT "organization_transaction_assignedTo_fkey";

-- DropForeignKey
ALTER TABLE "organization_transaction" DROP CONSTRAINT "organization_transaction_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "organization_transaction" DROP CONSTRAINT "organization_transaction_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "organization_transaction_category" DROP CONSTRAINT "organization_transaction_category_organizationId_fkey";

-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "file_upload" DROP COLUMN "organizationProductsAndServicesId",
DROP COLUMN "organizationTransactionId",
ADD COLUMN     "productAndServiceId" TEXT,
ADD COLUMN     "transactionId" TEXT;

-- DropTable
DROP TABLE "organization_ai_usage";

-- DropTable
DROP TABLE "organization_integration";

-- DropTable
DROP TABLE "organization_integration_instagram";

-- DropTable
DROP TABLE "organization_messaging_agent";

-- DropTable
DROP TABLE "organization_products_and_services";

-- DropTable
DROP TABLE "organization_transaction";

-- DropTable
DROP TABLE "organization_transaction_category";

-- DropEnum
DROP TYPE "OrganizationIntegrationVoiceMessageService";

-- DropEnum
DROP TYPE "OrganizationIntegrationVoiceMessageVoice";

-- DropEnum
DROP TYPE "organization_integration_type";

-- DropEnum
DROP TYPE "organization_products_and_service_status";

-- CreateTable
CREATE TABLE "integration" (
    "id" TEXT NOT NULL,
    "type" "integration_type" NOT NULL,
    "instagramIntegrationId" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "integration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integration_instagram" (
    "id" TEXT NOT NULL,
    "instagramUserId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "tokenType" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "instagramBusinessId" TEXT,
    "isBotEnabled" BOOLEAN NOT NULL DEFAULT false,
    "isVoiceMessageResponseEnabled" BOOLEAN NOT NULL DEFAULT false,
    "replyDelay" INTEGER NOT NULL DEFAULT 0,
    "voiceMessageService" "integration_voice_message_service" NOT NULL DEFAULT 'ELEVENLABS',
    "voiceMessageVoice" "voice_message_service" NOT NULL DEFAULT 'SARAH',

    CONSTRAINT "integration_instagram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_category" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "color" TEXT,

    CONSTRAINT "transaction_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,
    "assignedTo" TEXT,
    "attachmentUrl" TEXT,
    "notes" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messaging_agent" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "status" "organization_agent_status" NOT NULL DEFAULT 'PENDING',
    "prompt" TEXT,
    "integrationId" TEXT,
    "hasAccessToProductsAndServices" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messaging_agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_usage" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "tokens" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_usage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_and_service" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER DEFAULT 0,
    "priceStartsFrom" INTEGER DEFAULT 0,
    "currency" TEXT DEFAULT 'MDL',
    "status" "products_and_service_status" NOT NULL DEFAULT 'ACTIVE',
    "websiteUrlLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_and_service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "integration_instagram_instagramUserId_key" ON "integration_instagram"("instagramUserId");

-- AddForeignKey
ALTER TABLE "integration" ADD CONSTRAINT "integration_instagramIntegrationId_fkey" FOREIGN KEY ("instagramIntegrationId") REFERENCES "integration_instagram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "integration" ADD CONSTRAINT "integration_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_category" ADD CONSTRAINT "transaction_category_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "transaction_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_upload" ADD CONSTRAINT "file_upload_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_upload" ADD CONSTRAINT "file_upload_productAndServiceId_fkey" FOREIGN KEY ("productAndServiceId") REFERENCES "product_and_service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_agent" ADD CONSTRAINT "messaging_agent_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_agent" ADD CONSTRAINT "messaging_agent_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "integration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_usage" ADD CONSTRAINT "ai_usage_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_and_service" ADD CONSTRAINT "product_and_service_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
