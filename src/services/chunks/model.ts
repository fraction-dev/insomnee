export interface CreateChunkInput {
    knowledgeBaseItemId: string
    content: string
    embedding: number[]
    index: number
}

export interface Chunk {
    id: string
    knowledgeBaseItemId: string
    index: number
    content: string
    embedding: number[]
}

export interface RawChunkResult {
    id: string
    knowledgeBaseItemId: string
    content: string
    index: number
    embedding_json: string
}

export interface ChunkWithSimilarity extends Chunk {
    similarity: number
}
