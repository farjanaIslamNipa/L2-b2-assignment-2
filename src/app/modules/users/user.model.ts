import { Schema, model } from 'mongoose';
import { TAddress, TOrders, TUser, TUserName, UserModel } from './user.interface';
import bcrypt from 'bcrypt'
import config from '../../config';

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

const userSchema = new Schema<TUser, UserModel>({
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
    required: true,
    select: false
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
    required: true,
    default: true
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
    type: [orderSchema]
  }
})

// hashing password
userSchema.pre('save', async function(next){
  //eslint-disable-next-line
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
  next()
})

userSchema.post('save', function(doc, next){
  doc.password =''
  next()
})

userSchema.pre('find', function(next){
  this.find({isActive: {$ne: false}})
  next()
})
userSchema.pre('findOne', function(next){
  this.find({isActive: {$ne: false}})
  next()
})
userSchema.pre('aggregate', function(next){
  this.pipeline().unshift({$match: {isActive: {$ne: false}}})
  next()
})

// Static method to check existing user
userSchema.statics.isUserExists = async function(id: number){
  const existingUser = await User.findOne({userId: id})
  return existingUser;
}


export const User = model<TUser, UserModel>('User', userSchema)