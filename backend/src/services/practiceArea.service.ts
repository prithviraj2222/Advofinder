import { Prisma } from "../generated/prisma/client.js";
import prisma from "../lib/prisma.js";
type PracticeAreaWhereInput =
  Prisma.Args<typeof prisma.practiceArea, "findMany">["where"];
import AppError from "../utils/AppError.js";
import {
  CreatePracticeAreaData,
  PracticeAreaQueryData,
  UpdatePracticeAreaData,
} from "../validations/practiceArea.validation.js";

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

export const updatePracticeArea = async (
  id: number,
  data: UpdatePracticeAreaData,
) => {
  const practiceArea = await prisma.practiceArea.update({
    where: {
      id,
    },
    data: {
      name: data.name,
    },
  });

  return practiceArea;
};

export const deletePracticeArea = async (id: number) => {
  await prisma.practiceArea.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  return {
    message: "Practice Area deleted successfully",
  }
};

export const getAllPracticeAreas = async (data: PracticeAreaQueryData) => {
  const page = data.page ?? 1;
  const limit = data.limit ?? 10;

  const skip = (page - 1) * limit;

  const where: PracticeAreaWhereInput =  {
    deletedAt: null,
  };

  if (data.search) {
    where.name = {
      contains: data.search,
      mode: "insensitive",
    }
  }

  let orderBy: Prisma.Args<typeof prisma.practiceArea, "findMany">["orderBy"]  = {
    createdAt: "desc",
  };

  if (data.sortBy === "name") {
    orderBy = {
      name: data.sortOrder ?? "asc",
    };
  }

  if (data.sortBy === "createdAt") {
    orderBy = {
      createdAt: data.sortOrder ?? "desc",
    };
  }

  const [practiceAreas, total] = await Promise.all([
    prisma.practiceArea.findMany({
      where,
      skip,
      take: limit,
      orderBy,
    }),

    prisma.practiceArea.count({
      where,
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  const result = practiceAreas;

  return {
    data: result,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
} 
