export class HttpException extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode: number,
        public readonly error?: string,
    ) {
        super(message)
        this.name = this.constructor.name
    }

    getStatus(): number {
        return this.statusCode
    }

    getResponse(): string | object {
        return {
            statusCode: this.statusCode,
            message: this.message,
            error: this.error || this.name,
        }
    }
}

// 4xx Client Error Exceptions
export class BadRequestException extends HttpException {
    constructor(message: string = 'Bad Request') {
        super(message, 400, 'Bad Request')
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message: string = 'Unauthorized') {
        super(message, 401, 'Unauthorized')
    }
}

export class PaymentRequiredException extends HttpException {
    constructor(message: string = 'Payment Required') {
        super(message, 402, 'Payment Required')
    }
}

export class ForbiddenException extends HttpException {
    constructor(message: string = 'Forbidden') {
        super(message, 403, 'Forbidden')
    }
}

export class NotFoundException extends HttpException {
    constructor(message: string = 'Not Found') {
        super(message, 404, 'Not Found')
    }
}

export class MethodNotAllowedException extends HttpException {
    constructor(message: string = 'Method Not Allowed') {
        super(message, 405, 'Method Not Allowed')
    }
}

export class NotAcceptableException extends HttpException {
    constructor(message: string = 'Not Acceptable') {
        super(message, 406, 'Not Acceptable')
    }
}

export class ProxyAuthenticationRequiredException extends HttpException {
    constructor(message: string = 'Proxy Authentication Required') {
        super(message, 407, 'Proxy Authentication Required')
    }
}

export class RequestTimeoutException extends HttpException {
    constructor(message: string = 'Request Timeout') {
        super(message, 408, 'Request Timeout')
    }
}

export class ConflictException extends HttpException {
    constructor(message: string = 'Conflict') {
        super(message, 409, 'Conflict')
    }
}

export class GoneException extends HttpException {
    constructor(message: string = 'Gone') {
        super(message, 410, 'Gone')
    }
}

export class LengthRequiredException extends HttpException {
    constructor(message: string = 'Length Required') {
        super(message, 411, 'Length Required')
    }
}

export class PreconditionFailedException extends HttpException {
    constructor(message: string = 'Precondition Failed') {
        super(message, 412, 'Precondition Failed')
    }
}

export class PayloadTooLargeException extends HttpException {
    constructor(message: string = 'Payload Too Large') {
        super(message, 413, 'Payload Too Large')
    }
}

export class UriTooLongException extends HttpException {
    constructor(message: string = 'URI Too Long') {
        super(message, 414, 'URI Too Long')
    }
}

export class UnsupportedMediaTypeException extends HttpException {
    constructor(message: string = 'Unsupported Media Type') {
        super(message, 415, 'Unsupported Media Type')
    }
}

export class RequestedRangeNotSatisfiableException extends HttpException {
    constructor(message: string = 'Requested Range Not Satisfiable') {
        super(message, 416, 'Requested Range Not Satisfiable')
    }
}

export class ExpectationFailedException extends HttpException {
    constructor(message: string = 'Expectation Failed') {
        super(message, 417, 'Expectation Failed')
    }
}

export class ImATeapotException extends HttpException {
    constructor(message: string = "I'm a teapot") {
        super(message, 418, "I'm a teapot")
    }
}

export class MisdirectedException extends HttpException {
    constructor(message: string = 'Misdirected') {
        super(message, 421, 'Misdirected')
    }
}

export class UnprocessableEntityException extends HttpException {
    constructor(message: string = 'Unprocessable Entity') {
        super(message, 422, 'Unprocessable Entity')
    }
}

export class LockedException extends HttpException {
    constructor(message: string = 'Locked') {
        super(message, 423, 'Locked')
    }
}

export class FailedDependencyException extends HttpException {
    constructor(message: string = 'Failed Dependency') {
        super(message, 424, 'Failed Dependency')
    }
}

export class PreconditionRequiredException extends HttpException {
    constructor(message: string = 'Precondition Required') {
        super(message, 428, 'Precondition Required')
    }
}

export class TooManyRequestsException extends HttpException {
    constructor(message: string = 'Too Many Requests') {
        super(message, 429, 'Too Many Requests')
    }
}

// 5xx Server Error Exceptions
export class InternalServerErrorException extends HttpException {
    constructor(message: string = 'Internal Server Error') {
        super(message, 500, 'Internal Server Error')
    }
}

export class NotImplementedException extends HttpException {
    constructor(message: string = 'Not Implemented') {
        super(message, 501, 'Not Implemented')
    }
}

export class BadGatewayException extends HttpException {
    constructor(message: string = 'Bad Gateway') {
        super(message, 502, 'Bad Gateway')
    }
}

export class ServiceUnavailableException extends HttpException {
    constructor(message: string = 'Service Unavailable') {
        super(message, 503, 'Service Unavailable')
    }
}

export class GatewayTimeoutException extends HttpException {
    constructor(message: string = 'Gateway Timeout') {
        super(message, 504, 'Gateway Timeout')
    }
}

export class HttpVersionNotSupportedException extends HttpException {
    constructor(message: string = 'HTTP Version Not Supported') {
        super(message, 505, 'HTTP Version Not Supported')
    }
}

export class DatabaseOperationError extends Error {
    constructor(
        message: string,
        public readonly code: string,
    ) {
        super(message)
        this.name = 'DatabaseOperationError'
    }
}
