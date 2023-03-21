import { Schema, model } from 'mongoose';


const userSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
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
