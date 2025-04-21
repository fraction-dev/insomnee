/* eslint-disable no-console */
import pino from 'pino'

/**
 * Logger configuration types
 */
type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'
type LogMessage = string
type LogError = unknown
type LogMetadata = Record<string, unknown>

/**
 * Logger interface with methods to support different call patterns
 */
interface Logger {
    error(message: LogMessage, metadata?: LogMetadata & { error?: LogError }): void
    warn(message: LogMessage, metadata?: LogMetadata & { error?: LogError }): void
    info(message: LogMessage, metadata?: LogMetadata & { error?: LogError }): void
    debug(message: LogMessage, metadata?: LogMetadata & { error?: LogError }): void
    trace(message: LogMessage, metadata?: LogMetadata & { error?: LogError }): void
    fatal(message: LogMessage, metadata?: LogMetadata & { error?: LogError }): void
}

/**
 * Helper to ensure error is properly formatted
 */
const formatError = (error: unknown): Error => {
    if (error instanceof Error) {
        return error
    }
    return new Error(typeof error === 'string' ? error : JSON.stringify(error))
}

/**
 * Extract error data from metadata for consistent formatting
 */
const extractErrorData = (metadata?: LogMetadata & { error?: LogError }) => {
    if (!metadata?.error) return { errorData: {}, cleanMetadata: metadata || {} }

    const errorObj = formatError(metadata.error)
    const errorData = {
        error: {
            name: errorObj.name,
            message: errorObj.message,
            stack: errorObj.stack,
        },
    }

    // Remove the original error to avoid duplication
     
    const { error: _, ...restMetadata } = metadata

    return { errorData, cleanMetadata: restMetadata }
}

/**
 * Create a logger factory function that generates all log methods
 */
const createLoggerMethods = (implementation: (level: LogLevel, message: LogMessage, metadata?: LogMetadata) => void): Logger => {
    const logLevels: LogLevel[] = ['fatal', 'error', 'warn', 'info', 'debug', 'trace']

    return logLevels.reduce((logger, level) => {
        logger[level] = (message: LogMessage, metadata?: LogMetadata & { error?: LogError }) => implementation(level, message, metadata)
        return logger
    }, {} as Logger)
}

/**
 * Browser/Edge Runtime logger with proper level handling
 */
const createConsoleLogger = (): Logger => {
    const logLevel = (process.env.LOG_LEVEL as LogLevel) || 'info'

    const levels: Record<LogLevel, number> = {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10,
    }

    const shouldLog = (level: LogLevel) => levels[level] >= levels[logLevel]

    const consoleMethods: Record<LogLevel, typeof console.log> = {
        fatal: console.error,
        error: console.error,
        warn: console.warn,
        info: console.info,
        debug: console.debug,
        trace: console.trace,
    }

    const implementation = (level: LogLevel, message: LogMessage, metadata?: LogMetadata) => {
        if (!shouldLog(level)) return

        const { errorData, cleanMetadata } = extractErrorData(metadata)
        const timestamp = new Date().toISOString()
        const consoleMethod = consoleMethods[level]
        const displayTime = new Date(timestamp).toLocaleString()
        consoleMethod(`[${displayTime}] ${level.toUpperCase()}: ${message}`)

        const context = { ...cleanMetadata, ...errorData }
        if (Object.keys(context).length > 0) {
            consoleMethod('Additional context:', JSON.stringify(context, null, 2))
        }

        if ('error' in errorData && errorData.error?.stack) {
            consoleMethod('Error stack:', errorData.error.stack)
        }
    }

    return createLoggerMethods(implementation)
}

/**
 * Create a Pino logger with proper configuration
 */
const createPinoLogger = (): Logger => {
    try {
        const pinoLogger = pino({
            level: process.env.LOG_LEVEL || 'info',
            timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
            formatters: {
                level: (label) => ({ level: label }),
            },
            ...(process.env.NODE_ENV === 'development' && {
                transport: {
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                        ignore: 'pid,hostname',
                        translateTime: 'SYS:standard',
                        messageFormat: '{msg} {rest}',
                    },
                },
            }),
        })

        const implementation = (level: LogLevel, message: LogMessage, metadata?: LogMetadata) => {
            const { errorData, cleanMetadata } = extractErrorData(metadata)
            pinoLogger[level]({ ...cleanMetadata, ...errorData }, message)
        }

        return createLoggerMethods(implementation)
    } catch {
        return createConsoleLogger()
    }
}

const shouldUseConsoleLogger = (): boolean => {
    return typeof window !== 'undefined' || process.env.NEXT_RUNTIME === 'edge' || process.env.TURBOPACK === '1'
}

const logger: Logger = shouldUseConsoleLogger() ? createConsoleLogger() : createPinoLogger()

export default logger
