import prisma from "../lib/prisma.js";
import AppError from "../utils/AppError.js";
import { UpdateUserData } from "../validations/user.validation.js";

export const getUserDetails = async (id: number) => {
  let result = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  if (!result) {
    throw new AppError("User not found", 404);
  }

  const { password, ...user } = result;

  return user;
};

export const updateUserDetails = async (id: number, data: UpdateUserData) => {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      ...data,
    },

  });

  const {password, ...updatedUser} = user;

  return updatedUser;
};
