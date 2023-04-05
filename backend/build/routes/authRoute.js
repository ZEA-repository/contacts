import { Router } from 'express';
const userService = require('@/service/userService');
const router = Router();
router.post('/registration', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userData = await userService.registration(email, password);
        const maxAgeCookie = 30 * 24 * 60 * 60 * 1000;
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: maxAgeCookie,
            httpOnly: true
        });
        return res.json(userData);
    }
    catch (e) {
        next(e);
    }
});
router.get('/activate/:link', async (req, res, next) => {
    try {
        const { link } = req.params;
        await userService.activate(link);
        return res.redirect(process.env.CLIENT_URL);
    }
    catch (e) {
        next(e);
    }
});
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userData = await userService.login(email, password);
        const maxAgeCookie = 30 * 24 * 60 * 60 * 1000;
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: maxAgeCookie,
            httpOnly: true
        });
        return res.json(userData);
    }
    catch (e) {
        next(e);
    }
});
router.post('/logout', async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const token = await userService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.json(token);
    }
    catch (e) {
        next(e);
    }
});
router.get('/refresh', async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const userData = await userService.refresh(refreshToken);
        const maxAgeCookie = 30 * 24 * 60 * 60 * 1000;
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: maxAgeCookie,
            httpOnly: true
        });
        return res.json(userData);
    }
    catch (e) {
        next(e);
    }
});
export default router;
//# sourceMappingURL=authRoute.js.map