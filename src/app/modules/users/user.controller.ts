import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";


const createUser =async (req:Request, res: Response) => {
  try{
    const userData = req.body;

    // zod validation
    const zodParsedData = userValidationSchema.parse(userData)

    const result = await UserServices.createUserIntoDB(zodParsedData)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result
    })
  }catch(err: any){
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err
    })
  }
}

const getAllUsers = async (req:Request, res: Response) => {
  try{
    const result = await UserServices.getAllUsersFromDB()
    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: result
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: 'Users data not found',
      error: err
    })
  }
}

const getSingleUser = async (req:Request, res: Response) => {
  try{

    const {userId} = req.params
    const result = await UserServices.getSingleUserFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'User get successfully',
      data: result
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: 'User Not found',
      error: err
    })
  }
}

const updateUser = async (req:Request, res: Response) => {
  // try{

  //   const {userId} = req.params
  //   const result = await UserServices.updateUserIntoDB(userId)
  //   res.status(200).json({
  //     success: true,
  //     message: 'User get successfully',
  //     data: result
  //   })
  // }catch(err){
  //   res.status(500).json({
  //     success: false,
  //     message: 'User Not found',
  //     error: err
  //   })
  // }
}



export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser
}