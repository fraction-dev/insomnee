import {
    LeadGenerationAgentConfiguration as PrismaLeadGenerationAgentConfiguration,
    LeadGenerationAgentRun as PrismaLeadGenerationAgentRun,
} from '@prisma/client'
import { prisma } from 'prisma/db'

import { DatabaseOperationError, NotFoundException } from '~/core/exception'
import { safeJsonParse, safeJsonStringify } from '~/lib/json/json'
import {
    ICP_ANNUAL_REVENUE,
    ICP_COMPANY_SIZE_RANGES,
    ICP_DECISION_MAKERS,
    ICP_INDUSTRY_VERTICALS,
} from '~/services/leads-generation/consts/icp'
import {
    LeadsGenerationAgentConfiguration,
    LeadsGenerationAgentConfigurationPayload,
    LeadsGenerationAgentRun,
    LeadsGenerationAgentRunStatus,
    LeadsGenerationAgentSignalCategory,
    LeadsGenerationAgentThreadRunResponse,
} from '~/services/leads-generation/model'

type PrismaLeadsGenerationAgentConfigurationWithRelations = PrismaLeadGenerationAgentConfiguration & {
    run: PrismaLeadGenerationAgentRun | null
}

// Data transformation functions
const mapPrismaToLeadsGenerationConfigurationModel = (
    prisma: PrismaLeadsGenerationAgentConfigurationWithRelations,
): LeadsGenerationAgentConfiguration => {
    return {
        id: prisma.id,
        organizationId: prisma.organizationId,
        status: prisma.status,
        companyName: prisma.companyName,
        newsFramework: {
            searchKeywords: prisma.newsFrameworkSearchKeywords,
            essentialSignals: safeJsonParse<LeadsGenerationAgentSignalCategory[]>(prisma.newsFrameworkEssentialSignals as string, []),
            additionalSignals: safeJsonParse<LeadsGenerationAgentSignalCategory[]>(prisma.newsFrameworkAdditionalSignals as string, []),
            searchConfig: {
                countries: prisma.newsFrameworkSearchConfigCountries,
            },
        },
        solution: prisma.solution ?? '',
        icpCompanySizeRange: prisma.icpCompanySizeRange as (typeof ICP_COMPANY_SIZE_RANGES)[number][],
        icpIndustryVertical: prisma.icpIndustryVertical as (typeof ICP_INDUSTRY_VERTICALS)[number][],
        icpAnnualRevenue: prisma.icpAnnualRevenue as (typeof ICP_ANNUAL_REVENUE)[number][],
        icpHqLocation: prisma.icpHqLocation ?? '',
        icpPhysicalPresence: prisma.icpPhysicalPresence,
        decisionMakers: prisma.decisionMakers as (typeof ICP_DECISION_MAKERS)[number][],
        createdAt: prisma.createdAt,
        updatedAt: prisma.updatedAt,
        run: prisma.run ? mapPrismaToLeadsGenerationAgentRunToModel(prisma.run) : null,
    }
}

const mapPrismaToLeadsGenerationAgentRunToModel = (prisma: PrismaLeadGenerationAgentRun): LeadsGenerationAgentRun => {
    return {
        id: prisma.id,
        organizationId: prisma.organizationId,
        threadId: prisma.threadId,
        runId: prisma.runId,
        assistantId: prisma.assistantId,
        status: prisma.status,
        executionTimeInSeconds: prisma.executionTimeInSeconds ?? 0,
        insights: safeJsonParse(prisma.insights as string, []),
        jobPostings: safeJsonParse(prisma.jobPostings as string, []),
        newsArticles: safeJsonParse(prisma.newsArticles as string, []),
        createdAt: prisma.createdAt,
        updatedAt: prisma.updatedAt,
    }
}

// Public API functions
export const createConfiguration = async (organizationId: string, input: LeadsGenerationAgentConfigurationPayload) => {
    try {
        const record = await prisma.leadGenerationAgentConfiguration.create({
            data: {
                organizationId,
                status: 'PAUSED',
                companyName: input.companyName,
                newsFrameworkSearchKeywords: input.newsFramework.searchKeywords,
                newsFrameworkEssentialSignals: safeJsonStringify(input.newsFramework.essentialSignals),
                newsFrameworkAdditionalSignals: safeJsonStringify(input.newsFramework.additionalSignals),
                newsFrameworkSearchConfigCountries: input.newsFramework.searchConfig.countries,
                solution: input.solution,
                icpCompanySizeRange: input.icpCompanySizeRange,
                icpIndustryVertical: input.icpIndustryVertical,
                icpAnnualRevenue: input.icpAnnualRevenue,
                icpHqLocation: input.icpHqLocation,
                icpPhysicalPresence: input.icpPhysicalPresence,
                decisionMakers: input.decisionMakers,
            },
            include: {
                run: true,
            },
        })

        return mapPrismaToLeadsGenerationConfigurationModel(record)
    } catch (error) {
        throw new DatabaseOperationError(
            `Failed to create onboarding data: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'CREATE_ONBOARDING_FAILED',
        )
    }
}

export const updateConfiguration = async (id: string, data: Partial<LeadsGenerationAgentConfiguration>) => {
    try {
        const updated = await prisma.leadGenerationAgentConfiguration.update({
            where: { id },
            data: {
                status: data.status ?? undefined,
                newsFrameworkEssentialSignals: data?.newsFramework?.essentialSignals
                    ? safeJsonStringify(data.newsFramework.essentialSignals)
                    : undefined,
                newsFrameworkAdditionalSignals: data?.newsFramework?.additionalSignals
                    ? safeJsonStringify(data.newsFramework.additionalSignals)
                    : undefined,
                newsFrameworkSearchConfigCountries: data?.newsFramework?.searchConfig?.countries ?? undefined,
                newsFrameworkSearchKeywords: data.newsFramework?.searchKeywords ?? undefined,
                solution: data.solution ?? undefined,
                icpCompanySizeRange: data.icpCompanySizeRange ?? undefined,
                icpIndustryVertical: data.icpIndustryVertical ?? undefined,
                icpAnnualRevenue: data.icpAnnualRevenue ?? undefined,
                icpHqLocation: data.icpHqLocation ?? undefined,
                icpPhysicalPresence: data.icpPhysicalPresence ?? undefined,
            },
            include: {
                run: true,
            },
        })

        if (!updated) {
            throw new NotFoundException(`Configuration with id ${id} not found`)
        }

        return mapPrismaToLeadsGenerationConfigurationModel(updated)
    } catch (error) {
        throw new DatabaseOperationError(
            `Failed to update configuration: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'UPDATE_CONFIGURATION_FAILED',
        )
    }
}

export const getConfigurationByOrganizationId = async (organizationId: string): Promise<LeadsGenerationAgentConfiguration | null> => {
    try {
        const data = await prisma.leadGenerationAgentConfiguration.findFirst({
            where: { organizationId },
            include: {
                run: true,
            },
        })

        return data ? mapPrismaToLeadsGenerationConfigurationModel(data) : null
    } catch (error) {
        throw new DatabaseOperationError(
            `Failed to get configuration: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'GET_CONFIGURATION_FAILED',
        )
    }
}

export const createLeadGenerationRun = async (
    organizationId: string,
    configurationId: string,
    data: LeadsGenerationAgentThreadRunResponse,
): Promise<LeadsGenerationAgentRun> => {
    try {
        const record = await prisma.leadGenerationAgentRun.create({
            data: {
                organizationId,
                configurationId,
                threadId: data.thread_id,
                runId: data.run_id,
                assistantId: data.assistant_id,
                status: 'PENDING',
                insights: safeJsonStringify([]),
                jobPostings: safeJsonStringify([]),
                newsArticles: safeJsonStringify([]),
            },
            include: {
                configuration: true,
            },
        })

        return mapPrismaToLeadsGenerationAgentRunToModel(record)
    } catch (error) {
        throw new DatabaseOperationError(
            `Failed to create lead generation run: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'CREATE_RUN_FAILED',
        )
    }
}

export const getAllPendingLeadGenerationRuns = async (): Promise<LeadsGenerationAgentRun[]> => {
    try {
        const records = await prisma.leadGenerationAgentRun.findMany({
            where: { status: 'PENDING' },
            include: { configuration: true },
        })

        return records.map(mapPrismaToLeadsGenerationAgentRunToModel)
    } catch (error) {
        throw new DatabaseOperationError(
            `Failed to get pending runs: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'GET_PENDING_RUNS_FAILED',
        )
    }
}

export const getOrganizationLeadGenerationRuns = async (organizationId: string): Promise<LeadsGenerationAgentRun[]> => {
    try {
        const records = await prisma.leadGenerationAgentRun.findMany({
            where: { organizationId },
            include: { configuration: true },
            orderBy: { createdAt: 'desc' },
        })

        return records.map(mapPrismaToLeadsGenerationAgentRunToModel)
    } catch (error) {
        throw new DatabaseOperationError(
            `Failed to get organization runs: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'GET_ORGANIZATION_RUNS_FAILED',
        )
    }
}

export const updateLeadGenerationAgentRun = async (recordId: string, data: Partial<LeadsGenerationAgentRun>) => {
    try {
        await prisma.leadGenerationAgentRun.update({
            where: { id: recordId },
            data: {
                status: data.status || undefined,
                executionTimeInSeconds: data.executionTimeInSeconds || undefined,
                insights: data.insights ? safeJsonStringify(data.insights) : undefined,
                jobPostings: data.jobPostings ? safeJsonStringify(data.jobPostings) : undefined,
                newsArticles: data.newsArticles ? safeJsonStringify(data.newsArticles) : undefined,
            },
        })
    } catch (error) {
        throw new DatabaseOperationError(
            `Failed to update lead generation run: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'UPDATE_RUN_FAILED',
        )
    }
}

export const getLeadGenerationRunById = async (runId: string): Promise<LeadsGenerationAgentRun> => {
    try {
        const record = await prisma.leadGenerationAgentRun.findUnique({
            where: { id: runId },
            include: { configuration: true },
        })

        if (!record) {
            throw new NotFoundException(`Lead generation run with id ${runId} not found`)
        }

        return mapPrismaToLeadsGenerationAgentRunToModel(record)
    } catch (error) {
        if (error instanceof NotFoundException) {
            throw error
        }
        throw new DatabaseOperationError(
            `Failed to get lead generation run: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'GET_RUN_FAILED',
        )
    }
}

export const getCompanyConfigurations = async (organizationId: string): Promise<LeadsGenerationAgentConfiguration[]> => {
    try {
        const records = await prisma.leadGenerationAgentConfiguration.findMany({
            where: { organizationId },
            include: {
                run: true,
            },
        })

        return records.map(mapPrismaToLeadsGenerationConfigurationModel)
    } catch (error) {
        throw new DatabaseOperationError(
            `Failed to get company configurations: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'GET_COMPANY_CONFIGURATIONS_FAILED',
        )
    }
}

export const getOrganizationConfigurationById = async (
    organizationId: string,
    configurationId: string,
): Promise<LeadsGenerationAgentConfiguration> => {
    try {
        const record = await prisma.leadGenerationAgentConfiguration.findUnique({
            where: { id: configurationId, organizationId },
            include: {
                run: true,
            },
        })

        if (!record) {
            throw new NotFoundException(`Configuration with id ${configurationId} not found`)
        }

        return mapPrismaToLeadsGenerationConfigurationModel(record)
    } catch (error) {
        throw new DatabaseOperationError(
            `Failed to get organization configuration: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'GET_ORGANIZATION_CONFIGURATION_FAILED',
        )
    }
}

export const getConfigurationRun = async (configurationId: string): Promise<LeadsGenerationAgentRun | null> => {
    try {
        const records = await prisma.leadGenerationAgentRun.findFirst({
            where: { configurationId },
            include: { configuration: true },
        })

        return records ? mapPrismaToLeadsGenerationAgentRunToModel(records) : null
    } catch (error) {
        throw new DatabaseOperationError(
            `Failed to get configuration runs: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'GET_CONFIGURATION_RUNS_FAILED',
        )
    }
}

export const updateConfigurationRunStatus = async (configurationId: string, status: LeadsGenerationAgentRunStatus) => {
    try {
        await prisma.leadGenerationAgentRun.update({
            where: { id: configurationId },
            data: { status },
        })
    } catch (error) {
        throw new DatabaseOperationError(
            `Failed to update configuration run status: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'UPDATE_CONFIGURATION_RUN_STATUS_FAILED',
        )
    }
}
