/*
  Warnings:

  - Made the column `icpCompanySizeRange` on table `lead_generation_agent_onboarding` required. This step will fail if there are existing NULL values in that column.
  - Made the column `icpIndustryVerticals` on table `lead_generation_agent_onboarding` required. This step will fail if there are existing NULL values in that column.
  - Made the column `icpAnnualRevenue` on table `lead_generation_agent_onboarding` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `decisionMakers` on the `lead_generation_agent_onboarding` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "lead_generation_agent_onboarding" ALTER COLUMN "icpCompanySizeRange" SET NOT NULL,
ALTER COLUMN "icpIndustryVerticals" SET NOT NULL,
ALTER COLUMN "icpAnnualRevenue" SET NOT NULL,
DROP COLUMN "decisionMakers",
ADD COLUMN     "decisionMakers" "seniority_level" NOT NULL;
