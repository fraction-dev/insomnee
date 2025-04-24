/*
  Warnings:

  - You are about to drop the `integration` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "organization_integration_type" AS ENUM ('INSTAGRAM', 'FACEBOOK', 'WHATSAPP', 'TWITTER', 'TELEGRAM', 'SIMPALS');

-- DropForeignKey
ALTER TABLE "integration" DROP CONSTRAINT "integration_organizationId_fkey";

-- DropTable
DROP TABLE "integration";

-- DropEnum
DROP TYPE "integration_type";

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
    "accessToken" TEXT NOT NULL,
    "tokenType" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "organization_integration_instagram_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "organization_integration" ADD CONSTRAINT "organization_integration_instagramIntegrationId_fkey" FOREIGN KEY ("instagramIntegrationId") REFERENCES "organization_integration_instagram"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_integration" ADD CONSTRAINT "organization_integration_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
