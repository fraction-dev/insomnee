/*
  Warnings:

  - The `status` column on the `messaging_agent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "agent_status" AS ENUM ('PENDING', 'ACTIVE');

-- AlterTable
ALTER TABLE "messaging_agent" DROP COLUMN "status",
ADD COLUMN     "status" "agent_status" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "organization_agent_status";
