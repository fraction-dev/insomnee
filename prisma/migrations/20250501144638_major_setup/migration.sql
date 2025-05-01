-- CreateEnum
CREATE TYPE "organization_verification_status" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "organization_language" AS ENUM ('RU', 'EN', 'RO', 'UA');

-- CreateEnum
CREATE TYPE "organization_currency" AS ENUM ('MDL', 'USD', 'EUR', 'RON', 'UAH');

-- CreateEnum
CREATE TYPE "organization_member_role" AS ENUM ('ADMIN', 'MEMBER', 'GUEST');

-- CreateEnum
CREATE TYPE "organization_integration_type" AS ENUM ('INSTAGRAM', 'FACEBOOK', 'WHATSAPP', 'TWITTER', 'TELEGRAM', 'SIMPALS');

-- CreateEnum
CREATE TYPE "OrganizationIntegrationVoiceMessageService" AS ENUM ('ELEVENLABS');

-- CreateEnum
CREATE TYPE "OrganizationIntegrationVoiceMessageVoice" AS ENUM ('SARAH', 'ALEX', 'DOMINIQUE', 'EMMA', 'SOPHIA', 'LUCIA');

-- CreateEnum
CREATE TYPE "file_upload_type" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT', 'KNOWLEDGE_BASE', 'OTHER');

-- CreateEnum
CREATE TYPE "file_upload_access_type" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "organization_agent_status" AS ENUM ('PENDING', 'ACTIVE');

-- CreateEnum
CREATE TYPE "organization_products_and_service_status" AS ENUM ('ACTIVE', 'IN_REVIEW', 'DELETED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "defaultLanguage" "organization_language" NOT NULL DEFAULT 'RU',
    "defaultCurrency" "organization_currency" NOT NULL DEFAULT 'MDL',
    "websiteUrl" TEXT,
    "logoUrl" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "city" TEXT,
    "country" TEXT,
    "registrationNumber" TEXT,
    "referralCode" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "isVerified" BOOLEAN DEFAULT false,
    "verificationStatus" "organization_verification_status",
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_member" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "organization_member_role" NOT NULL,

    CONSTRAINT "organization_member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_integration" (
    "id" TEXT NOT NULL,
    "type" "organization_integration_type" NOT NULL,
    "instagramIntegrationId" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_integration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_integration_instagram" (
    "id" TEXT NOT NULL,
    "instagramUserId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "tokenType" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "instagramBusinessId" TEXT,
    "isBotEnabled" BOOLEAN NOT NULL DEFAULT false,
    "isVoiceMessageResponseEnabled" BOOLEAN NOT NULL DEFAULT false,
    "replyDelay" INTEGER NOT NULL DEFAULT 0,
    "voiceMessageService" "OrganizationIntegrationVoiceMessageService" NOT NULL DEFAULT 'ELEVENLABS',
    "voiceMessageVoice" "OrganizationIntegrationVoiceMessageVoice" NOT NULL DEFAULT 'SARAH',

    CONSTRAINT "organization_integration_instagram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_transaction_category" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "color" TEXT,

    CONSTRAINT "organization_transaction_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_transaction" (
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

    CONSTRAINT "organization_transaction_pkey" PRIMARY KEY ("id")
);

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
    "organizationTransactionId" TEXT,
    "organizationProductsAndServicesId" TEXT,

    CONSTRAINT "file_upload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_messaging_agent" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "status" "organization_agent_status" NOT NULL DEFAULT 'PENDING',
    "prompt" TEXT,
    "integrationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_messaging_agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_ai_usage" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "tokens" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_ai_usage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_products_and_services" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER DEFAULT 0,
    "priceStartsFrom" INTEGER DEFAULT 0,
    "currency" TEXT DEFAULT 'MDL',
    "status" "organization_products_and_service_status" NOT NULL DEFAULT 'ACTIVE',
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

-- CreateTable
CREATE TABLE "currency_rate" (
    "id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "symbol" TEXT,
    "combinations" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "currency_rate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_chats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "messages" JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_chats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "organization_integration_instagram_instagramUserId_key" ON "organization_integration_instagram"("instagramUserId");

-- CreateIndex
CREATE UNIQUE INDEX "currency_rate_currency_key" ON "currency_rate"("currency");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_member" ADD CONSTRAINT "organization_member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_member" ADD CONSTRAINT "organization_member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_integration" ADD CONSTRAINT "organization_integration_instagramIntegrationId_fkey" FOREIGN KEY ("instagramIntegrationId") REFERENCES "organization_integration_instagram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_integration" ADD CONSTRAINT "organization_integration_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_transaction_category" ADD CONSTRAINT "organization_transaction_category_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_transaction" ADD CONSTRAINT "organization_transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "organization_transaction_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_transaction" ADD CONSTRAINT "organization_transaction_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_transaction" ADD CONSTRAINT "organization_transaction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_upload" ADD CONSTRAINT "file_upload_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_upload" ADD CONSTRAINT "file_upload_organizationTransactionId_fkey" FOREIGN KEY ("organizationTransactionId") REFERENCES "organization_transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_upload" ADD CONSTRAINT "file_upload_organizationProductsAndServicesId_fkey" FOREIGN KEY ("organizationProductsAndServicesId") REFERENCES "organization_products_and_services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_messaging_agent" ADD CONSTRAINT "organization_messaging_agent_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_messaging_agent" ADD CONSTRAINT "organization_messaging_agent_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "organization_integration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_ai_usage" ADD CONSTRAINT "organization_ai_usage_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_products_and_services" ADD CONSTRAINT "organization_products_and_services_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_agent_response_messages" ADD CONSTRAINT "messaging_agent_response_messages_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_chats" ADD CONSTRAINT "user_chats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
