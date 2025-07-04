/*
  Warnings:

  - Changed the type of `jobFrameworkAdditionalSignals` on the `lead_generation_agent_onboarding` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `jobFrameworkEssentialSignals` on the `lead_generation_agent_onboarding` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `newsFrameworkAdditionalSignals` on the `lead_generation_agent_onboarding` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `newsFrameworkEssentialSignals` on the `lead_generation_agent_onboarding` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "lead_generation_agent_onboarding" DROP COLUMN "jobFrameworkAdditionalSignals",
ADD COLUMN     "jobFrameworkAdditionalSignals" JSONB NOT NULL,
DROP COLUMN "jobFrameworkEssentialSignals",
ADD COLUMN     "jobFrameworkEssentialSignals" JSONB NOT NULL,
DROP COLUMN "newsFrameworkAdditionalSignals",
ADD COLUMN     "newsFrameworkAdditionalSignals" JSONB NOT NULL,
DROP COLUMN "newsFrameworkEssentialSignals",
ADD COLUMN     "newsFrameworkEssentialSignals" JSONB NOT NULL;
