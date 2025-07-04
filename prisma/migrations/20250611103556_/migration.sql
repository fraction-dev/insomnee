/*
  Warnings:

  - You are about to drop the column `jobFramework` on the `lead_generation_agent_onboarding` table. All the data in the column will be lost.
  - You are about to drop the column `newsFramework` on the `lead_generation_agent_onboarding` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "lead_generation_agent_onboarding" DROP COLUMN "jobFramework",
DROP COLUMN "newsFramework",
ADD COLUMN     "jobFrameworkAdditionalSignals" TEXT[],
ADD COLUMN     "jobFrameworkEssentialSignals" TEXT[],
ADD COLUMN     "jobFrameworkSearchConfigCountries" TEXT[],
ADD COLUMN     "jobFrameworkSearchKeywords" TEXT[],
ADD COLUMN     "newsFrameworkAdditionalSignals" TEXT[],
ADD COLUMN     "newsFrameworkEssentialSignals" TEXT[],
ADD COLUMN     "newsFrameworkSearchConfigCountries" TEXT[],
ADD COLUMN     "newsFrameworkSearchKeywords" TEXT[];
