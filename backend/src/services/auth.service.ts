import { RegisterData } from "../validations/auth.validation.js";
import prisma from "../lib/prisma.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";

const registerUser = async (data: RegisterData) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    throw new AppError("Email already registered", 409);
  }

  const hashed = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashed,
      phoneNumber: data.phoneNumber,
    },
  });
};
