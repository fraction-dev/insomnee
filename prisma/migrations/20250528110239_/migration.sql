/*
  Warnings:

  - The `status` column on the `invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "invoice_status" AS ENUM ('DRAFT', 'SENT', 'PAID', 'CANCELLED', 'UNPAID', 'OVERDUE');

-- AlterTable
ALTER TABLE "invoice" DROP COLUMN "status",
ADD COLUMN     "status" "invoice_status" NOT NULL DEFAULT 'DRAFT';

-- DropEnum
DROP TYPE "InvoiceStatus";
