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

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findOne({userId: id}).select('-password');
  return result;
}

const updateUserIntoDB = async (id: string, body: object) => {
  const result = await User.updateOne({userId: id}, body)
    return result;

}

const deleteUserFromDB = async (id: string) => {
  const result = await User.updateOne({userId: id}, {isActive: false})
  return result;
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB
}