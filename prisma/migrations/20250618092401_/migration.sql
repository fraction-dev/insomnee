/*
  Warnings:

  - A unique constraint covering the columns `[runId]` on the table `lead_generation_agent_configuration` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[configurationId]` on the table `lead_generation_agent_run` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "lead_generation_agent_configuration" ADD COLUMN     "runId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "lead_generation_agent_configuration_runId_key" ON "lead_generation_agent_configuration"("runId");

-- CreateIndex
CREATE UNIQUE INDEX "lead_generation_agent_run_configurationId_key" ON "lead_generation_agent_run"("configurationId");
