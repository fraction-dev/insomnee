import { fetchLeadsGenerationAgent } from '~/lib/agents/api/fetchLeadsGenerationAgent'
import {
    LeadsGenerationAgentThread,
    LeadsGenerationAgentThreadData,
    LeadsGenerationAgentThreadRunPayload,
    LeadsGenerationAgentThreadRunResponse,
} from '~/services/leads-generation/model'

export const createLeadsGenerationAgentThread = async () => {
    return fetchLeadsGenerationAgent<LeadsGenerationAgentThread>('POST', '/threads')
}

export const createLeadsGenerationAgentThreadRun = async (threadId: string, payload: LeadsGenerationAgentThreadRunPayload) => {
    return fetchLeadsGenerationAgent<LeadsGenerationAgentThreadRunResponse>('POST', `/threads/${threadId}/runs`, payload)
}

export const getLeadsGenerationAgentThreadData = async (threadId: string) => {
    return fetchLeadsGenerationAgent<LeadsGenerationAgentThreadData>('GET', `/threads/${threadId}`)
}
