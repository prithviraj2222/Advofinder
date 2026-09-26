import generateOtp from "../utils/otp.js";
import prisma from "../lib/prisma.js";
import { sendOtpEmail } from "./email.service.js";
import AppError from "../utils/AppError.js";
import { OtpData } from "../validations/otp.validation.js";

export const getOtp = () => generateOtp();

export const storeOtp = async (email: string) => {
  const otp: string = getOtp();
  try {
    await prisma.otp.deleteMany({
      where: {
        email: email,
      },
    });

    await prisma.otp.create({
      data: {
        email: email,
        otp: otp,
        expiresAt: new Date(Date.now() + 300000),
      },
    });

    await sendOtpEmail(email, otp);
  } catch (error) {
    await prisma.otp.deleteMany({
      where: {
        email: email,
      },
    });

    throw error;
  }
};

export const verifyotp = async (data: OtpData) => {
  const otp = await prisma.otp.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!otp) {
    throw new AppError("Invalid Otp", 400);
  }

  if (new Date() > otp.expiresAt) {
    throw new AppError("OTP expired", 400);
  }

  if (otp.otp !== data.otp) {
    throw new AppError("Invalid Otp", 400);
  }

  await prisma.otp.update({
    where: {
      id: otp.id,
    },
    data: {
      verified: true,
    },
  });

  return {
    success: true,
    message: "OTP verified successfully",
    verified: true,
  };
};
