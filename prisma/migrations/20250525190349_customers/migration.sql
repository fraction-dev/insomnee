/*
Warnings:

- You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "customer_status" AS ENUM ('ACTIVE', 'ARCHIVED');

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "phoneNumber" TEXT,
    "avatarUrl" TEXT,
    "country" TEXT,
    "city" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "zipCode" TEXT,
    "state" TEXT,
    "vatNumber" TEXT,
    "notes" TEXT,
    "status" "customer_status" NOT NULL DEFAULT 'ACTIVE',
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ (6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMPTZ (6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customer"
ADD CONSTRAINT "customer_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer"
ADD CONSTRAINT "customer_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;