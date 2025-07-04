import { z } from 'zod'

import { ICP_ANNUAL_REVENUE, ICP_COMPANY_SIZE_RANGES, ICP_DECISION_MAKERS, ICP_INDUSTRY_VERTICALS } from './consts/icp'

export interface LeadsGenerationAgentSignalCategory {
    category: string
    signals: { id: string; content: string }[]
}

export interface LeadsGenerationAgentConfiguration {
    id: string
    organizationId: string
    companyName: string
    newsFramework: {
        searchKeywords: string[]
        essentialSignals: LeadsGenerationAgentSignalCategory[]
        additionalSignals: LeadsGenerationAgentSignalCategory[]
        searchConfig: {
            countries: string[]
        }
    }
    solution: string
    icpCompanySizeRange: (typeof ICP_COMPANY_SIZE_RANGES)[number][]
    icpIndustryVertical: (typeof ICP_INDUSTRY_VERTICALS)[number][]
    icpAnnualRevenue: (typeof ICP_ANNUAL_REVENUE)[number][]
    icpHqLocation: string
    icpPhysicalPresence: boolean
    decisionMakers: (typeof ICP_DECISION_MAKERS)[number][]
    status: LeadsGenerationAgentConfigurationStatus
    run: LeadsGenerationAgentRun | null
    createdAt: Date
    updatedAt: Date
}

export type LeadsGenerationAgentConfigurationPayload = Omit<
    LeadsGenerationAgentConfiguration,
    'id' | 'createdAt' | 'updatedAt' | 'organizationId'
>

export interface LeadsGenerationAgentThread {
    thread_id: string
    created_at: string
    updated_at: string
    metadata: Record<string, unknown>
    status: string
    config: Record<string, unknown>
}

export interface LeadsGenerationAgentThreadDataInsight {
    signalMatchId: string
    signalId: string
    signalContent: string
    companyName: string
    summary: string
    relevance: string
    sourceType: string
    sourceId: string
}

export interface LeadsGenerationAgentThreadDataJobPosting {
    jobId: string
    searchContext: {
        provider: string
        searchKeywords: string[]
    }
    source: {
        companyName: string
        title: string
        location: string
        fullText: string
        applyOptions: Array<{
            title: string
            link: string
        }>
        detectedExtensions: {
            posted_at: string
            schedule_type: string
        }
        postingDate: string
    }
    evaluation: {
        matches: Array<{
            signalId: string
            signalContent: string
            type: string
            category: string
            confidence: string
            evidence: Array<{
                quote: string
                interpretation: string
                opportunities: string[]
            }>
            metadata: Record<string, unknown>
        }>
    }
}

export interface LeadsGenerationAgentThreadDataNewsArticle {
    articleId: string
    title: string
    snippet: string
    url: string
    publishDate: string
    searchContext: {
        provider: string
        searchKeywords: string[]
    }
    source: {
        title: string
        source: string
        snippet: string
        publishDate: string
        url: string
    }
    evaluation: {
        matches: Array<{
            signalId: string
            signalContent: string
            type: string
            category: string
            confidence: string
            evidence: Array<{
                quote: string
                interpretation: string
                opportunities: string[]
            }>
        }>

        metadata: {
            category: string
            sentiment: string
            eventType: string
            region: string
            locationContext: {
                region: string
                locationType: string
            }
            companyGrowthStage: string
            recentStrategicMoves: string[]
            announcementUrgency: string
            impactTimeframe: string
            strategicImportance: string
            decisionMakerInvolvement: boolean
            implementationStage: string
            isUrgent: boolean
            companyName: string
            publishDate: string
        }
    }
}

export type LeadsGenerationAgentThreadDataStatus = 'idle' | 'running' | 'completed' | 'failed' | 'cancelled' | 'expired'

export interface LeadsGenerationAgentThreadData {
    thread_id: string
    created_at: string
    updated_at: string
    metadata: Record<string, unknown>
    status: LeadsGenerationAgentThreadDataStatus
    config: Record<string, unknown>
    values: {
        input: LeadsGenerationAgentThreadRunPayload['input']
        insights: LeadsGenerationAgentThreadDataInsight[]
        jobPostings: LeadsGenerationAgentThreadDataJobPosting[]
        newsArticles: LeadsGenerationAgentThreadDataNewsArticle[]
    }
}

export interface LeadsGenerationAgentSignal {
    category: string
    signals: { id: string; content: string }[]
}

export interface LeadsGenerationAgentNewsFramework {
    searchKeywords: string[]
    essentialSignals: LeadsGenerationAgentSignal[]
    additionalSignals: LeadsGenerationAgentSignal[]
    searchConfig: {
        countries: string[]
    }
}

export interface LeadsGenerationAgentThreadRunPayload {
    assistant_id: 'agent'
    input: {
        input: {
            companyName: string
            solution: string
            decisionMakers: (typeof ICP_DECISION_MAKERS)[number][]
            newsFramework: LeadsGenerationAgentNewsFramework
            icpCompanySizeRange: (typeof ICP_COMPANY_SIZE_RANGES)[number][]
            icpIndustryVertical: (typeof ICP_INDUSTRY_VERTICALS)[number][]
            icpAnnualRevenue: (typeof ICP_ANNUAL_REVENUE)[number][]
            icpHqLocation: string
            icpPhysicalPresence: boolean
        }
    }
}

export interface LeadsGenerationAgentThreadRunResponse {
    run_id: string
    thread_id: string
    assistant_id: string
    metadata: {
        created_by: string
        graph_id: string
        assistant_id: string
    }
    status: 'success' | 'failed' | 'in_progress'
    created_at: string
    updated_at: string
    kwargs: {
        input: LeadsGenerationAgentThreadRunPayload['input']
    }
}

export type LeadsGenerationAgentConfigurationStatus = 'ACTIVE' | 'PAUSED'
export type LeadsGenerationAgentRunStatus = 'PENDING' | 'PAUSED' | 'COMPLETED' | 'FAILED'

export interface LeadsGenerationAgentRun {
    id: string
    organizationId: string
    threadId: string
    runId: string
    assistantId: string
    status: LeadsGenerationAgentRunStatus
    executionTimeInSeconds: number
    insights?: LeadsGenerationAgentThreadDataInsight[]
    jobPostings?: LeadsGenerationAgentThreadDataJobPosting[]
    newsArticles?: LeadsGenerationAgentThreadDataNewsArticle[]
    createdAt: Date
    updatedAt: Date
}

export interface LeadsGenerationAgentStatistics {
    totalExecutionTimeInSeconds: number
    totalInsights: number
    lastRunAt: Date | null
    successRatePercentage: number
}

const LeadsGenerationAgentOnboardingFormIdealCustomerSchema = z.object({
    name: z.string().min(1),
    reason: z.string().min(1),
    details: z.string().min(1),
})

export const NewsFrameworkNewsTypes = [
    'FUNDING_ANNOUNCEMENTS',
    'EXPANSION_NEWS',
    'PRODUCT_LAUNCHES',
    'ACQUISITION_ANNOUNCEMENTS',
    'LEADERSHIP_CHANGES',
    'PARTNERSHIP_ANNOUNCEMENTS',
    'OTHER',
] as const

const LeadsGenerationAgentOnboardingFormNewsFrameworkSchema = z.object({
    newsTypes: z.array(z.enum(NewsFrameworkNewsTypes)),
    keywords: z.array(z.string()),
    essentialSignals: z.array(z.string()),
    additionalSignals: z.array(z.string()),
})

export const LeadsGenerationAgentOnboardingFormSchema = z.object({
    companyName: z.string().min(1),
    companyWebsite: z.string().url(),
    solution: z.string().min(1),

    icpCompanySizeRange: z.array(z.enum(ICP_COMPANY_SIZE_RANGES)),
    icpIndustryVertical: z.array(z.enum(ICP_INDUSTRY_VERTICALS)),
    icpAnnualRevenue: z.array(z.enum(ICP_ANNUAL_REVENUE)),
    icpHqLocation: z.string().min(1),
    icpPhysicalPresence: z.boolean(),

    countries: z.array(z.string()),
    decisionMakers: z.array(z.enum(ICP_DECISION_MAKERS)),

    idealCustomers: z.array(LeadsGenerationAgentOnboardingFormIdealCustomerSchema),
    leadSignals: z.array(z.string()),

    newsFramework: LeadsGenerationAgentOnboardingFormNewsFrameworkSchema,
})

export const LeadsGenerationAgentOnboardingDirtyFormSchema = z.object({
    companyName: z.string().min(1),
    companyWebsite: z.string().url(),
    solution: z.string().min(1),
    targetCountry: z.string(),
})

export type LeadsGenerationAgentOnboardingDirtyFormSchemaType = z.infer<typeof LeadsGenerationAgentOnboardingDirtyFormSchema>

export type LeadsGenerationAgentOnboardingFormSchemaType = z.infer<typeof LeadsGenerationAgentOnboardingFormSchema>

const SignalCategorySchema = z.object({
    category: z.string(),
    signals: z.array(
        z.object({
            id: z.string(),
            content: z.string(),
        }),
    ),
})

export const LeadsGenerationAgentOnboardingSchema = z.object({
    newsFramework: z.object({
        searchKeywords: z.array(z.string()),
        essentialSignals: z.array(SignalCategorySchema),
        additionalSignals: z.array(SignalCategorySchema),
        searchConfig: z.object({
            countries: z.array(z.string()),
        }),
    }),
})
