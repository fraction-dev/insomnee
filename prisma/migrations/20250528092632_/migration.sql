-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "cancelledAt" TIMESTAMPTZ(6),
ADD COLUMN     "internalNotes" TEXT,
ADD COLUMN     "paidAt" TIMESTAMPTZ(6);
