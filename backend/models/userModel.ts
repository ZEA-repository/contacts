import { Schema, model } from 'mongoose';


const userSchema = new Schema({
  id: {
    type: String,
    // required: true,
    unique: true,
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
    required: true,
  }
});

const UserModel = model('User', userSchema);

export default UserModel;
