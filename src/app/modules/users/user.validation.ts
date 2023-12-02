import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

const addressValidationSchema = z.object({
  street: z.string().min(1, { message: "Street is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

const orderValidation = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  price: z.number().min(0, { message: "Price must be greater than or equal to 0" }),
  quantity: z.number().min(1, { message: "Quantity must be greater than or equal to 1" }),
});

const createUserValidationSchema = z.object({
  userId: z.number().min(1, { message: "User ID is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  fullName: userNameValidationSchema,
  age: z.number().min(0, { message: "Age must be greater than or equal to 0" }),
  email: z.string().email({ message: "Invalid email address" }),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string().min(1, { message: "Hobby is required" })),
  address: addressValidationSchema,
  orders: orderValidation.optional(),
});
const updateUserValidationSchema = z.object({
  userId: z.number().min(1, { message: "User ID is required" }).optional(),
  username: z.string().min(1, { message: "Username is required" }).optional(),
  password: z.string().min(1, { message: "Password is required" }).optional(),
  fullName: userNameValidationSchema.optional(),
  age: z.number().min(0, { message: "Age must be greater than or equal to 0" }).optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  isActive: z.boolean().default(true).optional(),
  hobbies: z.array(z.string().min(1, { message: "Hobby is required" })).optional(),
  address: addressValidationSchema.optional(),
  orders: orderValidation.optional().optional(),
});

export const userValidationSchema ={
  createUserValidationSchema,
  updateUserValidationSchema
}