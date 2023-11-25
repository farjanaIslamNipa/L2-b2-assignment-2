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

const userValidationSchema = z.object({
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

export default userValidationSchema