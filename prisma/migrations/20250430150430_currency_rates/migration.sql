-- CreateTable
CREATE TABLE "currency_rate" (
    "id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "symbol" TEXT,
    "combinations" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "currency_rate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "currency_rate_currency_key" ON "currency_rate"("currency");
