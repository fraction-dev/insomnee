type ErrorCode = 'badRequest' | 'notFound' | 'unauthorized' | 'forbidden' | 'conflict' | 'validationError' | 'internalError'

const unreachable = (_value: never): never => {
    throw new Error(`ERROR! Reached unreachable code with unexpected value: ${JSON.stringify(_value)}`)
}

export abstract class OperationalError extends Error {
    abstract readonly errorType: ErrorCode

    static isOperationalError(error: unknown): error is OperationalError {
        return error instanceof OperationalError
    }

    private mapErrorTypeToHttp() {
        switch (this.errorType) {
            case 'badRequest':
                return 400
            case 'notFound':
                return 404
            case 'unauthorized':
                return 401
            case 'forbidden':
                return 403
            case 'conflict':
                return 409
            case 'validationError':
                return 400
            case 'internalError':
                return 500
            default:
                unreachable(this.errorType)
        }
    }

    toHttp() {
        return {
            httpCode: this.mapErrorTypeToHttp(),
            message: this.message,
        }
    }

    getErrorCode(): ErrorCode | undefined {
        return this.code
    }

    constructor(
        message: string,
        private code?: ErrorCode | undefined,
    ) {
        super(message)
        this.name = 'OperationalError'
    }
}

export class BadRequestError extends OperationalError {
    readonly errorType = 'badRequest'
}

export class NotFoundError extends OperationalError {
    readonly errorType = 'notFound'
}

export class UnauthorizedError extends OperationalError {
    readonly errorType = 'unauthorized'
}

export class ForbiddenError extends OperationalError {
    readonly errorType = 'forbidden'
}

export class ConflictError extends OperationalError {
    readonly errorType = 'conflict'
}

export class ValidationError extends OperationalError {
    readonly errorType = 'validationError'
}

export class InternalError extends OperationalError {
    readonly errorType = 'internalError'
}
