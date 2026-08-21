import { RegisterData } from "../validations/auth.validation.js";
import prisma from "../lib/prisma.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";
import { storeOtp } from "./otp.service.js";

export const sendRegistrationOtp = async (email: string) => {
  const oldUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (oldUser) {
    throw new AppError("Email already registered", 409);
  }

  await storeOtp(email);

  return {
    message: "OTP sent successfully",
  };
};

export const registerUser = async (data: RegisterData) => {
  const otpRecord = await prisma.otp.findFirst({
    where: {
      email: data.email,
    }
  })

  if(!otpRecord?.verified){
    throw new AppError("Email not verified", 400)
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

  await prisma.otp.deleteMany({
    where: {
      email: data.email,
    }
  })

  const { password, ...user } = newUser;

  return user;
};
