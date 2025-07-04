-- CreateEnum
CREATE TYPE "lead_generation_agent_status" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "lead_generation_agent" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "onboardingDataId" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "assistantId" TEXT NOT NULL,
    "status" "lead_generation_agent_status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lead_generation_agent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lead_generation_agent" ADD CONSTRAINT "lead_generation_agent_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_generation_agent" ADD CONSTRAINT "lead_generation_agent_onboardingDataId_fkey" FOREIGN KEY ("onboardingDataId") REFERENCES "lead_generation_agent_onboarding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
