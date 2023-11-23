import { TUser } from "./user.interface";
import { User } from "./user.model";


const createUserIntoDB = async (userData: TUser) => {
    const user = new User(userData);

    console.log(userData.userId, 'user id')
    if(await user.isUserExist(userData.userId)){
      throw new Error("User already exists")
    }

    const result = await user.save()
    return result;
}

const getAllUsersFromDB = async () => {
  const result = await User.find()
  return result;
}

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findOne({userId: id});
  return result;
}

const updateUserIntoDB = async (id: string, key: string) => {
  const result = await User.updateOne({userId: id}, {property: key})
  return result;
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB
}