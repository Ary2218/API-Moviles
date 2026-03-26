export class DBError extends Error {
    constructor(message, cause) {
        super(message);
        this.name = 'DBError';
        this.cause = cause;
        this.status = 500;
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.status = 404;
    }
}
