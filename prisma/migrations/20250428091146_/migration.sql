-- CreateEnum
CREATE TYPE "organization_agent_status" AS ENUM ('PENDING', 'ACTIVE');

-- CreateTable
CREATE TABLE "organization_agent" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "messagingAgentStatus" "organization_agent_status" NOT NULL DEFAULT 'PENDING',
    "contentAgentStatus" "organization_agent_status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_agent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "organization_agent" ADD CONSTRAINT "organization_agent_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
