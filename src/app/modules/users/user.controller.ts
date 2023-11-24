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

    const { userId } = req.params
    const result = await UserServices.getSingleUserFromDB(Number(userId))
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
  try{

    const { userId } = req.params
    const result = await UserServices.updateUserIntoDB(Number(userId), req.body)
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result
    })
  }catch(err: any){
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err
    })
  }
}

const deleteUser = async(req:Request, res: Response) => {
  const { userId } = req.params;
  try{
    const result = await UserServices.deleteUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: result
    })

  }catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err
    })
  }
}

const addOrderToUser = async(req:Request, res: Response) => {
  const { userId } = req.params;

  try{
    const result = await UserServices.addOrderToUserIntoDB(Number(userId), req.body);
    res.status(200).json({
      success: true,
      message: 'Order added successfully',
      data: result
    })

  }catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err
    })
  }
}
const getSingleUserOrders = async(req:Request, res: Response) => {
  const { userId } = req.params;

  try{
    const result = await UserServices.getSingleUserOrdersFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: result
    })

  }catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err
    })
  }
}



export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrderToUser,
  getSingleUserOrders
}