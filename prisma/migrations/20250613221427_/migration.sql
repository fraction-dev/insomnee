-- AlterTable
ALTER TABLE "lead_generation_agent_run" ADD COLUMN     "configurationId" TEXT;

-- CreateTable
CREATE TABLE "lead_generation_agent_configuration" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "status" "lead_generation_agent_status" NOT NULL DEFAULT 'PENDING',
    "onboardingDataId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lead_generation_agent_configuration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lead_generation_agent_run" ADD CONSTRAINT "lead_generation_agent_run_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "lead_generation_agent_configuration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_generation_agent_configuration" ADD CONSTRAINT "lead_generation_agent_configuration_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_generation_agent_configuration" ADD CONSTRAINT "lead_generation_agent_configuration_onboardingDataId_fkey" FOREIGN KEY ("onboardingDataId") REFERENCES "lead_generation_agent_onboarding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
