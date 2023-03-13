import { Schema, model } from 'mongoose';


const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    // default: 'firstName'
  },
  lastName: {
    type: String,
    // required: true,
    // default: 'lastName'
  },
  email: {
    type: String,
    // required: true,
    // default: 'email'
  },
  phone: {
    type: String,
    // required: true,
    // default: 'phone'
  }
});

const userModel = model('User', userSchema);

export default userModel;
