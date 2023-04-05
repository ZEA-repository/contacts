import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    activationLink: {
        type: String,
    },
    phone: {
        type: String,
        unique: true,
    },
    avatar: {
        type: String,
    },
});
const UserModel = model('User', userSchema);
export default UserModel;
//# sourceMappingURL=userModel.js.map