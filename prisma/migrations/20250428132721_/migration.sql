/*
  Warnings:

  - You are about to drop the `organization_agent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "organization_agent" DROP CONSTRAINT "organization_agent_organizationId_fkey";

-- DropTable
DROP TABLE "organization_agent";

-- CreateTable
CREATE TABLE "organization_agent_messaging" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "status" "organization_agent_status" NOT NULL DEFAULT 'PENDING',
    "prompt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_agent_messaging_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "organization_agent_messaging" ADD CONSTRAINT "organization_agent_messaging_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
