import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { User } from "./user.model";


const createUser =async (req:Request, res: Response) => {
  try{
    const userData = req.body;

    const result = await UserServices.createUserIntoDB(userData)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
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
      message: 'Something went wrong',
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
      message: 'User retrieved successfully',
      data: result
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err
    })
  }
}

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser
}