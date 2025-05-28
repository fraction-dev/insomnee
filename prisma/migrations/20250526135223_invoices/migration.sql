-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'SENT', 'PAID', 'CANCELLED');

-- CreateTable
CREATE TABLE "invoice" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "imageUrl" TEXT,
    "dateFormat" TEXT NOT NULL DEFAULT 'DD/MM/YYYY',
    "currency" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "from" TEXT NOT NULL,
    "customerId" TEXT,
    "items" JSONB NOT NULL DEFAULT '[]',
    "paymentDetails" TEXT,
    "notes" TEXT,
    "discount" INTEGER DEFAULT 0,
    "vat" INTEGER DEFAULT 0,
    "tax" INTEGER DEFAULT 0,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
