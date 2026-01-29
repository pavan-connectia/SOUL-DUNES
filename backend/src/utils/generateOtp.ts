import crypto from "crypto";

export const generateOtpCode = () => {
  const buffer = crypto.randomBytes(3);
  const otp = parseInt(buffer.toString("hex"), 16) % 1000000;
  return otp.toString().padStart(6, "0");
};