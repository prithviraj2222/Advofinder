import {
  AdvocateData,
  LoginData,
  RefreshTokenData,
  RegisterData,
} from "../validations/auth.validation.js";
import prisma from "../lib/prisma.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";
import { storeOtp } from "./otp.service.js";
import jwt from "jsonwebtoken";

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
    },
  });

  if (!otpRecord?.verified) {
    throw new AppError("Email not verified", 400);
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
    },
  });

  const { password, ...user } = newUser;

  return user;
};

export const registerAdvocate = async (data: AdvocateData) => {
  const otpRecord = await prisma.otp.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!otpRecord?.verified) {
    throw new AppError("Email not verified", 400);
  }

  const hashed = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashed,
      phoneNumber: data.phoneNumber,
      role: "LAWYER",
    },
  });

  const newLawyer = await prisma.lawyer.create({
    data: {
      userId: newUser.id,
      barCouncilNumber: data.barCouncilNumber,
      city: data.city,
      state: data.state,
      country: data.country,
      pincode: data.pincode,
    },
  });

  await prisma.otp.deleteMany({
    where: {
      email: data.email,
    },
  });

  const { password, ...user } = newUser;

  return {
    user,
    lawyer: newLawyer,
  };
};

export const loginUser = async (data: LoginData) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPassValid = await bcrypt.compare(data.password, user.password);

  if (!isPassValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: "1d" },
  );

  const refToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });

  const refreshTokenExpiresAt = new Date();
  refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

  const hashToken = await bcrypt.hash(refToken, 10);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: hashToken,
      expiresAt: refreshTokenExpiresAt,
    },
  });

  return {
    token,
    refToken,
  };
};

export const refreshAccessToken = async (data: RefreshTokenData) => {
  const { id, role } = jwt.verify(
    data.refreshToken,
    process.env.JWT_REFRESH_SECRET!,
  ) as { id: number, role: string };

  const refToken = await prisma.refreshToken.findFirst({
    where: {
      userId: id,
    },
  });

  if (!refToken) {
    throw new AppError("Invalid refresh token", 401);
  }

  const result = await bcrypt.compare(refToken.token, data.refreshToken);

  if(!result){
        throw new AppError("Invalid refresh token", 401);
  }

  if(new Date() > refToken.expiresAt) {
    throw new AppError("Refresh token expired", 401);
  }

    const token = jwt.sign(
    { id: id, role: role },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: "1d" },
  );

  return token;

};
