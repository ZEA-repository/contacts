const ApiError = require('~/exceptions/apiError');
const tokenService = require('@/service/tokenService');
module.exports = function (req, res, next) {
    try {
        const autorizationHeader = req.headers.authorization;
        if (!autorizationHeader) {
            return next(ApiError.UnautorizedError());
        }
        const accessToken = autorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnautorizedError());
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnautorizedError());
        }
        req.body.user = userData;
        next();
    }
    catch (e) {
        next(ApiError.UnautorizedError());
    }
};
export {};
//# sourceMappingURL=authMiddlewares.js.map