/*
  Warnings:

  - You are about to drop the column `onboardingDataId` on the `lead_generation_agent_configuration` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `lead_generation_agent_configuration` table. All the data in the column will be lost.
  - You are about to drop the column `configurationId` on the `lead_generation_agent_run` table. All the data in the column will be lost.
  - You are about to drop the `lead_generation_agent_onboarding` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `companyName` to the `lead_generation_agent_configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icpPhysicalPresence` to the `lead_generation_agent_configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobFrameworkAdditionalSignals` to the `lead_generation_agent_configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobFrameworkEssentialSignals` to the `lead_generation_agent_configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newsFrameworkAdditionalSignals` to the `lead_generation_agent_configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newsFrameworkEssentialSignals` to the `lead_generation_agent_configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solution` to the `lead_generation_agent_configuration` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lead_generation_agent_configuration" DROP CONSTRAINT "lead_generation_agent_configuration_onboardingDataId_fkey";

-- DropForeignKey
ALTER TABLE "lead_generation_agent_onboarding" DROP CONSTRAINT "lead_generation_agent_onboarding_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "lead_generation_agent_run" DROP CONSTRAINT "lead_generation_agent_run_configurationId_fkey";

-- DropForeignKey
ALTER TABLE "lead_generation_agent_run" DROP CONSTRAINT "lead_generation_agent_run_onboardingDataId_fkey";

-- AlterTable
ALTER TABLE "lead_generation_agent_configuration" DROP COLUMN "onboardingDataId",
DROP COLUMN "status",
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "decisionMakers" TEXT[],
ADD COLUMN     "icpAnnualRevenue" TEXT[],
ADD COLUMN     "icpCompanySizeRange" TEXT[],
ADD COLUMN     "icpHqLocation" TEXT,
ADD COLUMN     "icpIndustryVertical" TEXT[],
ADD COLUMN     "icpPhysicalPresence" BOOLEAN NOT NULL,
ADD COLUMN     "jobFrameworkAdditionalSignals" JSONB NOT NULL,
ADD COLUMN     "jobFrameworkEssentialSignals" JSONB NOT NULL,
ADD COLUMN     "jobFrameworkSearchConfigCountries" TEXT[],
ADD COLUMN     "jobFrameworkSearchKeywords" TEXT[],
ADD COLUMN     "newsFrameworkAdditionalSignals" JSONB NOT NULL,
ADD COLUMN     "newsFrameworkEssentialSignals" JSONB NOT NULL,
ADD COLUMN     "newsFrameworkSearchConfigCountries" TEXT[],
ADD COLUMN     "newsFrameworkSearchKeywords" TEXT[],
ADD COLUMN     "solution" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "lead_generation_agent_run" DROP COLUMN "configurationId";

-- DropTable
DROP TABLE "lead_generation_agent_onboarding";

-- AddForeignKey
ALTER TABLE "lead_generation_agent_run" ADD CONSTRAINT "lead_generation_agent_run_onboardingDataId_fkey" FOREIGN KEY ("onboardingDataId") REFERENCES "lead_generation_agent_configuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
