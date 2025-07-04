/*
  Warnings:

  - You are about to drop the column `icpIndustryVerticals` on the `lead_generation_agent_onboarding` table. All the data in the column will be lost.
  - Added the required column `icpIndustryVertical` to the `lead_generation_agent_onboarding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "icp_company_size_range" ADD VALUE 'SOLO';

-- AlterTable
ALTER TABLE "lead_generation_agent_onboarding" DROP COLUMN "icpIndustryVerticals",
ADD COLUMN     "icpIndustryVertical" TEXT NOT NULL;
