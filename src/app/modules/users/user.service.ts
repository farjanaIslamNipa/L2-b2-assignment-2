import { TOrders, TUser } from "./user.interface";
import { User } from "./user.model";

// CREATE USER
const createUserIntoDB = async (userData: TUser) => {

    if(await User.isUserExists(userData.userId)){
      throw new Error("User already exists")
    }

    const result = await User.create(userData)
    return result;
}

// GET USER
const getAllUsersFromDB = async () => {
  const result = await User.find().select('-_id username fullName age email address')
  return result;
}

// GET SINGLE USER
const getSingleUserFromDB = async (id: number) => {
  if(await User.isUserExists(id)){
    const result = await User.findOne({userId: id}).select('-password -_id -fullName._id -address._id');
    return result;
  }else{
    throw new Error ("User not found")
  }

}

// UPDATE USER
const updateUserIntoDB = async (id: number, userData: TUser) => {
  if(await User.isUserExists(id)){
    const result = await User.updateOne({userId: id}, userData).select('-password -_id')
    return result;
  }else {
    throw new Error ("User not found")
  }
}

// DELETE USER
const deleteUserFromDB = async (id: number) => {
  if(await User.isUserExists(id)){
    const result = await User.updateOne({ userId: id }, {isActive: false});
    return result;
  }else {
    throw new Error ("User not found")
  }
}

// ADD ORDER
const addOrderToUserIntoDB = async (id: number, order: TOrders) => {
  if(await User.isUserExists(id)){
    const result = await User.updateOne({userId: id}, {$push: {orders: order}})
    return result
  }else {
    throw new Error ("User not found")
  }
}

//GET SINGLE USER ORDERS
const getSingleUserOrdersFromDB = async(id: number) => {
  if(await User.isUserExists(id)){
    const result = await User.findOne({userId: id}).select('orders -_id')
    return result;
  }else {
    throw new Error ("User not found")
  }
}

//CALCULATE TOTAL ORDER PRICE
const calculateUserOrdersTotalPrice = async(id: number) => {
  if(await User.isUserExists(id)){
    const result = await User.aggregate([
      {$match: {userId: Number(id)}},
      {$unwind: "$orders"},
      {$group: { _id: Number(id), total: { $sum: "$orders.price" }}}
    ])
    return result;
  }else {
    throw new Error ("User not found")
  }
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  addOrderToUserIntoDB,
  getSingleUserOrdersFromDB,
  calculateUserOrdersTotalPrice
}