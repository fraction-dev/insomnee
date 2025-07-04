/*
  Warnings:

  - You are about to drop the column `jobFrameworkAdditionalSignals` on the `lead_generation_agent_configuration` table. All the data in the column will be lost.
  - You are about to drop the column `jobFrameworkEssentialSignals` on the `lead_generation_agent_configuration` table. All the data in the column will be lost.
  - You are about to drop the column `jobFrameworkSearchConfigCountries` on the `lead_generation_agent_configuration` table. All the data in the column will be lost.
  - You are about to drop the column `jobFrameworkSearchKeywords` on the `lead_generation_agent_configuration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "lead_generation_agent_configuration" DROP COLUMN "jobFrameworkAdditionalSignals",
DROP COLUMN "jobFrameworkEssentialSignals",
DROP COLUMN "jobFrameworkSearchConfigCountries",
DROP COLUMN "jobFrameworkSearchKeywords";
