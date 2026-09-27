import prisma from "../lib/prisma.js";
import AppError from "../utils/AppError.js";
import { UpdateLawyerData } from "../validations/lawyer.validation.js";

export const getLawyerDetails = async (id: number) => {
  let lawyer = await prisma.lawyer.findUnique({
    where: {
      userId: id,
    },
    include: {
      user: true,
    },
  });

  if (!lawyer) {
    throw new AppError("Lawyer profile not found", 404);
  }

  const { password, ...user } = lawyer.user;

  return {
    ...lawyer,
    user,
  };
};

export const updateLawyerDetails = async (
  id: number,
  data: UpdateLawyerData,
) => {
  const { firstName, lastName, phoneNumber, ...lawyerData } = data;

  const updatedLawyer = await prisma.$transaction(async (tx) => {
    const lawyer = await tx.lawyer.update({
      where: {
        userId: id,
      },
      data: lawyerData,
    });

    const userData = await tx.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        phoneNumber,
      },
    });

    const { password, ...user } = userData;

    return {
      lawyer,
      user,
    };
  });

  return updatedLawyer;
};

export const getLawyerData = async (id: number) => {
  let lawyer = await prisma.lawyer.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });

  if (!lawyer) {
    throw new AppError("Lawyer profile not found", 404);
  }

  const { password, ...user } = lawyer.user;

  return {
    ...lawyer,
    user,
  };
};