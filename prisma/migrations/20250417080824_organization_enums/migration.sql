/*
  Warnings:

  - The `defaultLanguage` column on the `organization` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `defaultCurrency` column on the `organization` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `verificationStatus` column on the `organization` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "organization_verification_status" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "organization_language" AS ENUM ('RU', 'EN', 'RO');

-- CreateEnum
CREATE TYPE "organization_currency" AS ENUM ('MDL', 'USD', 'EUR', 'RON', 'UAH');

-- AlterTable
ALTER TABLE "organization" DROP COLUMN "defaultLanguage",
ADD COLUMN     "defaultLanguage" "organization_language" NOT NULL DEFAULT 'RU',
DROP COLUMN "defaultCurrency",
ADD COLUMN     "defaultCurrency" "organization_currency" NOT NULL DEFAULT 'MDL',
DROP COLUMN "verificationStatus",
ADD COLUMN     "verificationStatus" "organization_verification_status";
