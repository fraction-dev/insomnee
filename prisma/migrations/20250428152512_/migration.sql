-- CreateEnum
CREATE TYPE "OrganizationIntegrationVoiceMessageService" AS ENUM ('ELEVENLABS');

-- CreateEnum
CREATE TYPE "OrganizationIntegrationVoiceMessageVoice" AS ENUM ('SARAH', 'ALEX', 'DOMINIQUE', 'EMMA', 'SOPHIA', 'LUCIA');

-- DropForeignKey
ALTER TABLE "organization_integration" DROP CONSTRAINT "organization_integration_instagramIntegrationId_fkey";

-- DropForeignKey
ALTER TABLE "organization_integration" DROP CONSTRAINT "organization_integration_organizationId_fkey";

-- AlterTable
ALTER TABLE "organization_integration_instagram" ADD COLUMN     "isBotEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVoiceMessageResponseEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "replyDelay" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "voiceMessageService" "OrganizationIntegrationVoiceMessageService" NOT NULL DEFAULT 'ELEVENLABS',
ADD COLUMN     "voiceMessageVoice" "OrganizationIntegrationVoiceMessageVoice" NOT NULL DEFAULT 'SARAH';

-- CreateTable
CREATE TABLE "organization_messaging_configuration" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_messaging_configuration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "organization_integration" ADD CONSTRAINT "organization_integration_instagramIntegrationId_fkey" FOREIGN KEY ("instagramIntegrationId") REFERENCES "organization_integration_instagram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_integration" ADD CONSTRAINT "organization_integration_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_messaging_configuration" ADD CONSTRAINT "organization_messaging_configuration_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
