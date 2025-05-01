import { cosineSimilarity } from 'ai'
import { prisma } from 'prisma/db'
import logger from '~/core/logger'
import { Chunk, ChunkWithSimilarity, RawChunkResult } from '~/services/chunks/model'

export async function getChunksByKnowledgeBaseItemId(knowledgeBaseItemId: string): Promise<Chunk[]> {
    const fetchedChunks = await prisma.$queryRawUnsafe<RawChunkResult[]>(
        `SELECT id, "knowledgeBaseItemId", content, index, embedding::text as embedding_json
       FROM chunks 
       WHERE "knowledgeBaseItemId" = $1
       ORDER BY index ASC`,
        knowledgeBaseItemId,
    )

    return fetchedChunks.map(mapRawResultToChunk)
}

export async function getManyChunksByKnowledgeBaseItemIds(knowledgeBaseItemIds: string[]): Promise<Chunk[]> {
    const promises = knowledgeBaseItemIds.map((id) => getChunksByKnowledgeBaseItemId(id))
    const chunksArrays = await Promise.all(promises)
    return chunksArrays.flat()
}

export function rankChunksBySimilarity(chunks: Chunk[], embedding: number[], limit = 10): ChunkWithSimilarity[] {
    if (!chunks.length) return []
    if (!embedding.length) throw new Error('Embedding vector cannot be empty')

    const chunksWithSimilarity: ChunkWithSimilarity[] = chunks.map((chunk) => ({
        ...chunk,
        similarity: cosineSimilarity(embedding, chunk.embedding),
    }))

    chunksWithSimilarity.sort((a, b) => b.similarity - a.similarity)
    return chunksWithSimilarity.slice(0, Math.max(0, limit))
}

const mapRawResultToChunk = (rawChunk: RawChunkResult): Chunk => {
    let embedding: number[] = []

    if (rawChunk.embedding_json) {
        try {
            embedding = JSON.parse(rawChunk.embedding_json)

            if (!Array.isArray(embedding)) {
                logger.warn(`Embedding for chunk ${rawChunk.id} is not an array, using empty array instead`)
                embedding = []
            }
        } catch (error) {
            logger.error(`Error parsing embedding for chunk ${rawChunk.id}`)
        }
    }

    return {
        id: rawChunk.id,
        knowledgeBaseItemId: rawChunk.knowledgeBaseItemId,
        index: rawChunk.index,
        content: rawChunk.content,
        embedding,
    }
}
