import generateOtp from "../utils/otp.js";
import prisma from "../lib/prisma.js";

export const getOtp = () => generateOtp();

export const storeOtp = async (id) => {
    const otp = await prisma.otp.create({
        data: {
            userId: id,
            otp: getOtp(),
            expiresAt: new Date(Date.now() + 300000),
        }
    })
}   