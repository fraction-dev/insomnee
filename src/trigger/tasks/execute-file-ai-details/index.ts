/**
 * This task will create AI details of the uploaded 'PUBLIC' files.
 * It will receive an uploaded file and will create title, description and tags for it.
 */

import { openai } from '@ai-sdk/openai'
import { faker } from '@faker-js/faker'
import { logger, task } from '@trigger.dev/sdk/v3'
import { CoreMessage, generateObject, Message } from 'ai'
import { logOrganizationAIUsage } from 'prisma/services/ai-usage'
import { getFileById, updateFileUploadById } from 'prisma/services/file-upload'
import { getOrganizationById } from 'prisma/services/organization'
import { z } from 'zod'

import { SUPPORTED_AI_PROCESSING_MIME_TYPES } from '~/services/file-upload/consts'
import { TriggerTasks } from '~/trigger/types/tasks'

interface Payload {
    organizationId: string
    fileId: string
}

export const executeFileAIDetails = task({
    id: TriggerTasks.EXECUTE_FILE_AI_DETAILS,
    maxDuration: 300, // 5 min
    run: async ({ fileId, organizationId }: Payload) => {
        try {
            /**
             * Retrieve the organization from the database
             */
            const organization = await getOrganizationById(organizationId)
            if (!organization) {
                logger.error('Organization not found', { organizationId })
                return
            }

            /**
             * Retrieve the file from the database
             */
            const file = await getFileById(fileId)
            if (!file) {
                logger.error('File not found', { fileId })
                return
            }

            const fileContent = await fetch(file.url)
            const fileBuffer = await fileContent.arrayBuffer()

            const isSupportedMimeType = SUPPORTED_AI_PROCESSING_MIME_TYPES.includes(file.mimeType)
            if (!isSupportedMimeType) {
                logger.error('File mime type is not supported yet', { fileId, mimeType: file.mimeType })
                return
            }

            if (process.env.NODE_ENV === 'development') {
                logger.info('Skipping AI details generation for development', { fileId })
                await updateFileUploadById(file.id, {
                    status: 'COMPLETED',
                    title: faker.lorem.words(3),
                    description: faker.lorem.paragraph(2),
                    tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
                })

                return
            }

            /**
             * Update the file status to PROCESSING
             */
            await updateFileUploadById(file.id, {
                status: 'PROCESSING',
            })

            /**
             * Pass the file to the AI agent to generate the details
             */
            let messages: Array<CoreMessage> | Array<Omit<Message, 'id'>> = [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: `Analyze the following file and generate a title, description and tags for it. Title must be maximum 100 characters, description must be maximum 200 characters and tags must be maximum 10.`,
                        },
                    ],
                },
            ]

            if (file.mimeType.startsWith('image/')) {
                messages.push({
                    role: 'user',
                    content: [{ type: 'image', image: fileBuffer, mimeType: file.mimeType }],
                })
            } else {
                messages.push({
                    role: 'user',
                    content: [{ type: 'file', data: fileBuffer, mimeType: file.mimeType }],
                })
            }

            const { object, usage } = await generateObject({
                model: openai('gpt-4o'),
                schema: z.object({
                    title: z.string(),
                    description: z.string(),
                    tags: z.array(z.string()),
                }),
                messages,
            })

            /**
             * Log the AI usage for the organization
             */
            await logOrganizationAIUsage({
                organizationId,
                tokens: usage.totalTokens,
                description: `File AI details for file ${file.name}`,
            })

            /**
             * Update the file with the AI details
             */
            await updateFileUploadById(file.id, {
                title: object.title,
                description: object.description,
                tags: object.tags,
                status: 'COMPLETED',
            })
        } catch (error) {
            logger.error('Error executing file AI details', { error })
            await updateFileUploadById(fileId, {
                status: 'FAILED',
            })
        }
    },
})
