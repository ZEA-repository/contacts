import { Router } from 'express';
import UserModel from '~/models/userModel';
const userService = require('@/service/userService');
import mongoose from 'mongoose';
const authMiddleware = require('~/middlewares/authMiddlewares');
const router = Router();
router.get('/users', authMiddleware, async (_, res, next) => {
    try {
        const users = await userService.getAllUsers();
        return res.json(users);
    }
    catch (e) {
        next(e);
    }
});
router.put('/user/:id', async (req, res, next) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.id);
        const user = await UserModel.findById(userId);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            const updatedUser = await user.save();
            res.send({ ...updatedUser });
        }
    }
    catch (e) {
        next(e);
    }
});
router.post('/user', async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        const user = new UserModel({
            name,
            email,
            phone,
        });
        res.send(await user.save());
    }
    catch (e) {
        next(e);
    }
});
router.delete('/user/:id', async (req, res, next) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.id);
        const user = await UserModel.findById({ _id: userId });
        return user ? user.deleteOne() : res.send({ message: 'UserModel cannot be deleted' });
    }
    catch (e) {
        next(e);
    }
});
export default router;
//# sourceMappingURL=userRoute.js.map