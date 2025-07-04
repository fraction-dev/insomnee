-- CreateEnum
CREATE TYPE "organization_simulation_status" AS ENUM ('REAL', 'SIMULATED');

-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "simulationStatus" "organization_simulation_status";
