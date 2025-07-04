-- AlterTable
ALTER TABLE "lead_generation_agent" ADD COLUMN     "insights" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "jobPostings" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "newsArticles" JSONB NOT NULL DEFAULT '[]';
