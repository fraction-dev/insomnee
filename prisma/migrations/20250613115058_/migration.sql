/*
  Warnings:

  - You are about to drop the `lead_generation_agent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "lead_generation_agent" DROP CONSTRAINT "lead_generation_agent_onboardingDataId_fkey";

-- DropForeignKey
ALTER TABLE "lead_generation_agent" DROP CONSTRAINT "lead_generation_agent_organizationId_fkey";

-- DropTable
DROP TABLE "lead_generation_agent";

-- CreateTable
CREATE TABLE "lead_generation_agent_run" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "onboardingDataId" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "assistantId" TEXT NOT NULL,
    "status" "lead_generation_agent_status" NOT NULL DEFAULT 'PENDING',
    "executionTimeInSeconds" INTEGER DEFAULT 0,
    "insights" JSONB NOT NULL DEFAULT '[]',
    "jobPostings" JSONB NOT NULL DEFAULT '[]',
    "newsArticles" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lead_generation_agent_run_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lead_generation_agent_run" ADD CONSTRAINT "lead_generation_agent_run_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_generation_agent_run" ADD CONSTRAINT "lead_generation_agent_run_onboardingDataId_fkey" FOREIGN KEY ("onboardingDataId") REFERENCES "lead_generation_agent_onboarding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
