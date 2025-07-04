import { task } from '@trigger.dev/sdk/v3'
import { logOrganizationAIUsage } from 'prisma/services/ai-usage'
import { updateConfiguration } from 'prisma/services/leads-generation'

import { Serper } from '~/lib/server/serper'
import { TriggerTasks } from '~/trigger/types/tasks'

import { generateConfigurationData } from './nodes/ai-configuration-data'
import { extractNewsFramework } from './nodes/news-frameowork-extract'

interface Payload {
    organizationId: string
    configurationId: string
    companyName: string
    companyWebsite: string
    solution: string
    targetCountry: string
}

export const fillLeadGenerationAgentConfigurationTask = task({
    id: TriggerTasks.FILL_LEAD_GENERATION_AGENT_CONFIGURATION,
    run: async (payload: Payload) => {
        const { organizationId, configurationId, companyName, companyWebsite, solution, targetCountry } = payload

        const markdown = await scrapeWebsiteContent(companyWebsite)

        const { configuration, usage: configurationUsage } = await generateConfigurationData({
            markdown,
            targetCountry,
            companyName,
            solution,
        })

        const { newsFramework, usage: newsFrameworkUsage } = await extractNewsFramework(configuration)

        const totalTokenUsage = configurationUsage.totalTokens + newsFrameworkUsage.totalTokens

        await logOrganizationAIUsage({
            organizationId,
            tokens: totalTokenUsage,
            description: 'Fill lead generation agent configuration',
        })

        await updateConfiguration(configurationId, {
            companyName,
            newsFramework,
            solution,
            icpCompanySizeRange: configuration.icpCompanySizeRange,
            icpIndustryVertical: configuration.icpIndustryVertical,
            icpAnnualRevenue: configuration.icpAnnualRevenue,
            icpHqLocation: configuration.icpHqLocation,
            icpPhysicalPresence: configuration.icpPhysicalPresence,
            decisionMakers: configuration.decisionMakers,
            status: 'ACTIVE',
        })
    },
})

const scrapeWebsiteContent = async (websiteUrl: string): Promise<string> => {
    try {
        const serper = new Serper()
        const { markdown } = await serper.webPageScrap(websiteUrl)
        return markdown
    } catch (error) {
        throw new Error(`Failed to scrape website content: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}
