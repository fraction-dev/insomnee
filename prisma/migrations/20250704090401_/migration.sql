/*
  Warnings:

  - You are about to drop the column `simulationStatus` on the `organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organization" DROP COLUMN "simulationStatus";

-- DropEnum
DROP TYPE "organization_simulation_status";

-- CreateTable
CREATE TABLE "open_startup_metrics" (
    "id" TEXT NOT NULL,
    "totalBusinessCount" INTEGER NOT NULL DEFAULT 0,
    "totalTransactionsCount" INTEGER NOT NULL DEFAULT 0,
    "totalVaultFilesCount" INTEGER NOT NULL DEFAULT 0,
    "totalInvoicesCount" INTEGER NOT NULL DEFAULT 0,
    "totalAssistantResponsesCount" INTEGER NOT NULL DEFAULT 0,
    "totalLeadGenerationWorkingHoursCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "open_startup_metrics_pkey" PRIMARY KEY ("id")
);
