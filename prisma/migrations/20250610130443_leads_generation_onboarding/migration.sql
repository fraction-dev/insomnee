-- CreateEnum
CREATE TYPE "seniority_level" AS ENUM ('CEO', 'CTO', 'CMO', 'CRO', 'CFO');

-- CreateEnum
CREATE TYPE "icp_company_size_range" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "icp_industry_vertical" AS ENUM ('SOFTWARE', 'FINANCE', 'HEALTHCARE', 'EDUCATION');

-- CreateEnum
CREATE TYPE "icp_annual_revenue" AS ENUM ('LESS_THAN_1M', 'BETWEEN_1M_AND_10M', 'BETWEEN_10M_AND_100M', 'BETWEEN_100M_AND_1B', 'BETWEEN_1B_AND_10B', 'MORE_THAN_10B');

-- CreateTable
CREATE TABLE "lead_generation_agent_onboarding" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "jobFramework" TEXT,
    "newsFramework" TEXT,
    "solution" TEXT NOT NULL,
    "icpCompanySizeRange" "icp_company_size_range"[],
    "icpIndustryVerticals" "icp_industry_vertical"[],
    "icpAnnualRevenue" "icp_annual_revenue"[],
    "icpHqLocation" TEXT,
    "icpPhysicalPresence" BOOLEAN NOT NULL,
    "decisionMakers" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lead_generation_agent_onboarding_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lead_generation_agent_onboarding" ADD CONSTRAINT "lead_generation_agent_onboarding_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
