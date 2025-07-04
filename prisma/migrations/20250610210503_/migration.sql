/*
  Warnings:

  - The `jobFramework` column on the `lead_generation_agent_onboarding` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `newsFramework` column on the `lead_generation_agent_onboarding` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "lead_generation_agent_onboarding" DROP COLUMN "jobFramework",
ADD COLUMN     "jobFramework" TEXT[],
DROP COLUMN "newsFramework",
ADD COLUMN     "newsFramework" TEXT[];
