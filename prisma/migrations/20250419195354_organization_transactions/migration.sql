-- CreateTable
CREATE TABLE "organization_transaction_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "organization_transaction_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_transaction" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,
    "assignedTo" TEXT,
    "attachmentUrl" TEXT,
    "notes" TEXT,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "organization_transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "organization_transaction_category" ADD CONSTRAINT "organization_transaction_category_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_transaction" ADD CONSTRAINT "organization_transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "organization_transaction_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_transaction" ADD CONSTRAINT "organization_transaction_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_transaction" ADD CONSTRAINT "organization_transaction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
