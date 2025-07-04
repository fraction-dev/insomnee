/*
  Warnings:

  - The `icpIndustryVertical` column on the `lead_generation_agent_onboarding` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `icpCompanySizeRange` column on the `lead_generation_agent_onboarding` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `icpAnnualRevenue` column on the `lead_generation_agent_onboarding` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `decisionMakers` column on the `lead_generation_agent_onboarding` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "lead_generation_agent_onboarding" DROP COLUMN "icpIndustryVertical",
ADD COLUMN     "icpIndustryVertical" TEXT[],
DROP COLUMN "icpCompanySizeRange",
ADD COLUMN     "icpCompanySizeRange" TEXT[],
DROP COLUMN "icpAnnualRevenue",
ADD COLUMN     "icpAnnualRevenue" TEXT[],
DROP COLUMN "decisionMakers",
ADD COLUMN     "decisionMakers" TEXT[];
