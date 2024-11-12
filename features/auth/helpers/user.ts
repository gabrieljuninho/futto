import { db } from "@/lib/db";

import { generateUsername } from "@/features/auth/helpers/utils";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const updateUsername = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        username: true,
        email: true,
      },
    });

    if (user && user.username === null) {
      const username = generateUsername(user.email);

      await db.user.update({
        where: {
          id,
        },
        data: {
          username,
        },
      });
    }

    return null;
  } catch {
    return null;
  }
};
