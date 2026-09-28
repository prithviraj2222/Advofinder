import { Prisma } from "../generated/prisma/client.js";
import prisma from "../lib/prisma.js";
type LawyerWhereInput =
  Prisma.Args<typeof prisma.lawyer, "findMany">["where"];
import AppError from "../utils/AppError.js";
import { LawyerQueryData, UpdateLawyerData } from "../validations/lawyer.validation.js";

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
  const lawyer = await prisma.lawyer.findUnique({
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

export const getAllLawyersDetails = async (data: LawyerQueryData) => {
  const page = data.page ?? 1;
  const limit = data.limit ?? 10;

  const skip = (page - 1) * limit;

  const where: LawyerWhereInput =  {
    deletedAt: null,
    user: {
      deletedAt: null,
      isActive: true,
      emailVerified: true
    },
  };

  if (data.search) {
    where.OR = [
      {
        user: {
          firstName: {
            contains: data.search,
            mode: "insensitive",
          },
        },
      },
      {
        user: {
          lastName: {
            contains: data.search,
            mode: "insensitive",
          },
        },
      },
      {
        city: {
          contains: data.search,
          mode: "insensitive",
        },
      },
      {
        state: {
          contains: data.search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (data.city) {
    where.city = {
      equals: data.city,
      mode: "insensitive",
    }
  }

  if (data.state) {
    where.state = {
      equals: data.state,
      mode: "insensitive",
    };
  }

  if (data.experience !== undefined) {
    where.experience = {
      gte: data.experience,
    };
  }

  if (data.consultationFee !== undefined) {
    where.consultationFee = {
      lte: data.consultationFee,
    };
  }

  if (data.rating !== undefined) {
    where.averageRating = {
      gte: data.rating,
    };
  }

  let orderBy: Prisma.Args<typeof prisma.lawyer, "findMany">["orderBy"]  = {
    createdAt: "desc",
  };

  if (data.sortBy === "experience") {
    orderBy = {
      experience: data.sortOrder ?? "desc",
    };
  }

  if (data.sortBy === "consultationFee") {
    orderBy = {
      consultationFee: data.sortOrder ?? "asc",
    };
  }

  if (data.sortBy === "rating") {
    orderBy = {
      averageRating: data.sortOrder ?? "desc",
    };
  }

  const [lawyers, total] = await Promise.all([
    prisma.lawyer.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        user: true,
      },
    }),

    prisma.lawyer.count({
      where,
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  const result = lawyers.map((lawyer) => {
    const { password, ...user } = lawyer.user;

    return {
      ...lawyer,
      user,
    };
  });

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