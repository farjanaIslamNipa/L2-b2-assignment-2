import { Schema, model } from 'mongoose';
import { TAddress, TOrders, TUser, TUserName, UserModel } from './user.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
})

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
})

const orderSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
})

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: userNameSchema,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  hobbies: {
    type: [String],
    required: true
  },
  address: {
    type: addressSchema,
    required: true
  },
  orders: {
    type: [orderSchema],
    required: true
  }
})


export const User = model<TUser, UserModel>('User', userSchema)