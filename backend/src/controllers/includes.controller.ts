import { Request, Response } from "express";
import mongoose from "mongoose";
import { Includes } from "../models/Includes.model";

/**
 * CREATE Includes
 */
export const createIncludes = async (req: Request, res: Response) => {
    try {
        const { name, previewImageUrl, fileUrl} = req.body;

        if (!name || !previewImageUrl || !fileUrl) {
            return res.status(400).json({
                success: false,
                message: "all fields are require",
            });
        }

        const includes = await Includes.create({ name, previewImageUrl, fileUrl });

        res.status(201).json({
            success: true,
            message: "Includes created successfully",
            data: includes,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to create includes",
        });
    }
};

/**
 * GET ALL Includes
 */
export const getAllIncludes = async (_req: Request, res: Response) => {
    try {
        const includes = await Includes.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Includes fetched successfully",
            data: includes,
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "Failed to fetch includes",
        });
    }
};

/**
 * GET Includes BY ID
 */
export const getIncludesById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid includes ID",
            });
        }

        const includes = await Includes.findById(id);

        if (!includes) {
            return res.status(404).json({
                success: false,
                message: "Includes not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Includes fetched successfully",
            data: includes,
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "Failed to fetch includes",
        });
    }
};

/**
 * UPDATE Includes
 */
export const updateIncludes = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid includes ID",
            });
        }

        const includes = await Includes.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!includes) {
            return res.status(404).json({
                success: false,
                message: "Includes not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Includes updated successfully",
            data: includes,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to update includes",
        });
    }
};

/**
 * DELETE Includes
 */
export const deleteIncludes = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid includes ID",
            });
        }

        const includes = await Includes.findByIdAndDelete(id);

        if (!includes) {
            return res.status(404).json({
                success: false,
                message: "Includes not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Includes deleted successfully",
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "Failed to delete includes",
        });
    }
};
