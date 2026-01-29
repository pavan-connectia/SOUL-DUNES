import { Request, Response } from "express";
import Admin from "../models/admin.model";
import bcrypt from "bcryptjs";
import { generateOtpCode } from "../utils/generateOtp";
import sendEmail from "../utils/sendEmail";
import jwt from "jsonwebtoken";


const generateToken = (id: string) => {
    return jwt.sign({ _id: id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
    });
};

export const signupAdmin = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        const token = generateToken(admin._id.toString());

        res.status(201).json({
            success: true,
            message: "Signup successful",
            token,
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                token
            },
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = generateToken(admin._id.toString());

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                token
            },
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found with this email",
            });
        }

        const otp = generateOtpCode();

        admin.otp = Number(otp);
        admin.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await admin.save();

        const emailTemplate = `
      <h2>Password Reset OTP</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 10 minutes.</p>
    `;

        await sendEmail(
            admin.email,
            "Password Reset OTP",
            emailTemplate
        );

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const verifyOtpAndResetPassword = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, otp, newPassword } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        if (!admin.otp || admin.otp !== Number(otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        admin.password = hashedPassword;
        admin.otp = null;
        admin.otpExpiry = null;
        await admin.save();
        const token = generateToken(admin._id.toString());

        res.status(200).json({
            success: true,
            message: "Password reset successfully",
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                token
            },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await Admin.find().select("-password");

    res.status(200).json({
      success: true,
      count: admins.length,
      data: admins,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdminById = async (req: Request, res: Response) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

