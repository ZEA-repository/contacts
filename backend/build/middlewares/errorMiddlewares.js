const ApiError = require('~/exceptions/apiError');
module.exports = function (err, req, res, next) {
    console.log("🚀 ~ file: errorMiddlewares.ts:11 ~ err:", err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Status code 500' });
};
export {};
//# sourceMappingURL=errorMiddlewares.js.map