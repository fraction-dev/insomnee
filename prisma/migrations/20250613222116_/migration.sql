/*
  Warnings:

  - You are about to drop the column `onboardingDataId` on the `lead_generation_agent_run` table. All the data in the column will be lost.
  - Added the required column `configurationId` to the `lead_generation_agent_run` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "lead_generation_agent_configuration_status" AS ENUM ('ACTIVE', 'PAUSED');

-- DropForeignKey
ALTER TABLE "lead_generation_agent_run" DROP CONSTRAINT "lead_generation_agent_run_onboardingDataId_fkey";

-- AlterTable
ALTER TABLE "lead_generation_agent_configuration" ADD COLUMN     "status" "lead_generation_agent_configuration_status" NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "lead_generation_agent_run" DROP COLUMN "onboardingDataId",
ADD COLUMN     "configurationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "lead_generation_agent_run" ADD CONSTRAINT "lead_generation_agent_run_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "lead_generation_agent_configuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
