import { z } from "zod";

export const RegisterSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be 20 characters or less" })
    .regex(/^\S*$/, { message: "Username should not contain spaces" }),
  email: z
    .string({ required_error: "Email address is required" })
    .email({ message: "Enter a valid email address" })
    .min(11, { message: "Email address must be at least 11 characters" })
    .max(50, { message: "Email address must be 50 characters or less" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must be 20 characters or less" }),
});

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email address is required",
    })
    .email({ message: "Enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});
