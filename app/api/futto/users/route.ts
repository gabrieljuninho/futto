import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { User } from "@prisma/client";

import { sanitize } from "@/features/auth/helpers/sanitize";
import { generateImage } from "@/features/auth/helpers/utils";
import {
  getUserByEmail,
  getUserByUsername,
} from "@/features/auth/helpers/user";

import { db } from "@/lib/db";

import { RegisterSchema } from "@/schemas/auth";

export const POST = async (req: NextRequest) => {
  try {
    const values = await req.json();

    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return NextResponse.json({ status: 400, message: "Invalid request" });
    }

    const { username, email, password } = validatedFields.data;

    const sanitizedData = sanitize({ username, email, password });

    const existingUserByUsername = await getUserByUsername(
      sanitizedData.username
    );

    if (existingUserByUsername) {
      return NextResponse.json({
        status: 400,
        message: "Account with this username already exists.",
      });
    }

    const existingUserByEmail = await getUserByEmail(sanitizedData.email);

    if (existingUserByEmail) {
      return NextResponse.json({
        status: 400,
        message: "Account with this email address already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(sanitizedData.password, 10);

    const imageUrl = generateImage(sanitizedData.username);

    const user: User = await db.user.create({
      data: {
        username: sanitizedData.username,
        email: sanitizedData.email,
        password: hashedPassword,
        image: imageUrl,
      },
    });

    return NextResponse.json({
      status: 201,
      message: "User created successfully.",
      user,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return NextResponse.json({
        status: 500,
        message: "Internal server error. Please try again later.",
      });
    }
  }
};
