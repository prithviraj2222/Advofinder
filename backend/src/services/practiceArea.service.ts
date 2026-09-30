import prisma from "../lib/prisma.js";
import AppError from "../utils/AppError.js";
import { CreatePracticeAreaData } from "../validations/practiceArea.validation.js";

export const createPracticeArea = async (data: CreatePracticeAreaData) => {
  const oldPracticeArea = await prisma.practiceArea.findUnique({
    where: {
      name: data.name,
    },
  });

  if (oldPracticeArea && oldPracticeArea.deletedAt === null) {
    throw new AppError("Practice area already exists", 409);
  }

  const practiceArea = await prisma.practiceArea.create({
    data: {
        name: data.name,
    },
  });

  return practiceArea;
};
