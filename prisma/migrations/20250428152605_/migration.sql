/*
  Warnings:

  - You are about to drop the `organization_messaging_configuration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "organization_messaging_configuration" DROP CONSTRAINT "organization_messaging_configuration_organizationId_fkey";

-- DropTable
DROP TABLE "organization_messaging_configuration";
