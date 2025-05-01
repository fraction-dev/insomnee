import * as ChunksDB from 'prisma/services/chunks'

import { Chunk } from './model'

export const getChunksByKnowledgeBaseItemId = (knowledgeBaseItemId: string) => {
    return ChunksDB.getChunksByKnowledgeBaseItemId(knowledgeBaseItemId)
}

export const getManyChunksByKnowledgeBaseItemIds = (knowledgeBaseItemIds: string[]) => {
    return ChunksDB.getManyChunksByKnowledgeBaseItemIds(knowledgeBaseItemIds)
}

export const rankChunksBySimilarity = (chunks: Chunk[], embedding: number[], limit = 10) => {
    return ChunksDB.rankChunksBySimilarity(chunks, embedding, limit)
}
