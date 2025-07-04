/*
  Warnings:

  - Changed the type of `icpCompanySizeRange` on the `lead_generation_agent_onboarding` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `icpAnnualRevenue` on the `lead_generation_agent_onboarding` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `decisionMakers` on the `lead_generation_agent_onboarding` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "lead_generation_agent_onboarding" DROP COLUMN "icpCompanySizeRange",
ADD COLUMN     "icpCompanySizeRange" TEXT NOT NULL,
DROP COLUMN "icpAnnualRevenue",
ADD COLUMN     "icpAnnualRevenue" TEXT NOT NULL,
DROP COLUMN "decisionMakers",
ADD COLUMN     "decisionMakers" TEXT NOT NULL;

-- DropEnum
DROP TYPE "icp_annual_revenue";

-- DropEnum
DROP TYPE "icp_company_size_range";

-- DropEnum
DROP TYPE "icp_industry_vertical";

-- DropEnum
DROP TYPE "seniority_level";
