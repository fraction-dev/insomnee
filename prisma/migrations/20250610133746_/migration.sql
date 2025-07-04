-- AlterTable
ALTER TABLE "lead_generation_agent_onboarding" ALTER COLUMN "icpCompanySizeRange" DROP NOT NULL,
ALTER COLUMN "icpCompanySizeRange" TYPE "icp_company_size_range" USING "icpCompanySizeRange"[1]::text::"icp_company_size_range",
ALTER COLUMN "icpIndustryVerticals" DROP NOT NULL,
ALTER COLUMN "icpIndustryVerticals" TYPE "icp_industry_vertical" USING "icpIndustryVerticals"[1]::text::"icp_industry_vertical",
ALTER COLUMN "icpAnnualRevenue" DROP NOT NULL,
ALTER COLUMN "icpAnnualRevenue" TYPE "icp_annual_revenue" USING "icpAnnualRevenue"[1]::text::"icp_annual_revenue";