import { TUser } from "./user.interface";
import { User } from "./user.model";


const createUserIntoDB = async (userData: TUser) => {
    const user = new User(userData);

    if(await user.isUserExist(userData.userId)){
      throw new Error("User already exists")
    }

    const result = await user.save()
    return result;
}

const getAllUsersFromDB = async () => {
  const result = await User.find().select('-_id userId username fullName age email address')
  return result;
}

const getSingleUserFromDB = async (id: number) => {
  const result = await User.findOne({userId: id}).select('-password');
  return result;
}

const updateUserIntoDB = async (id: number, body: object) => {
  const result = await User.updateOne({userId: id}, body)
    return result;

}

const deleteUserFromDB = async (id: number) => {
  const result = await User.updateOne({userId: id}, {isActive: false})
  return result;
}

const addOrderToUserIntoDB = async (id: number, order: object) => {
  
  const result = await User.updateOne({userId: id}, {$push: {orders: order}})
  return result
}

const getSingleUserOrdersFromDB = async(id: number) => {
  const result = await User.findOne({userId: id}).select('orders')
  return result;
}
const calculateUserOrdersTotalPrice = async(id: number) => {
  const result = await User.aggregate([
    {$match: {userId: id}},
    {
      $unwind: "$orders"
    },
    {
      $group: {
        _id: id,
        total: {
          $sum: "$orders.price"
        },
        
      },
      
    },
    
  ])
  return result;
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