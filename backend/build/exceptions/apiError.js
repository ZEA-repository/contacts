module.exports = class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, actualProto);
        }
        else {
            this.__proto__ = actualProto;
        }
    }
    static UnautorizedError() {
        return new ApiError(401, 'User not autorized');
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
};
export {};
//# sourceMappingURL=apiError.js.map