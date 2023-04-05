import TokenModel from '~/models/tokenModel';
import jwt from 'jsonwebtoken';
class TokenService {
    async generateTokens(payload) {
        const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
        return {};
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await TokenModel.create({ user: userId, refreshToken });
        return token;
    }
    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({ refreshToken });
        return tokenData;
    }
    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({ refreshToken });
        return tokenData;
    }
    validateToken(token, secretToken) {
        try {
            const userData = jwt.verify(token, secretToken);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
}
module.exports = new TokenService();
//# sourceMappingURL=tokenService.js.map