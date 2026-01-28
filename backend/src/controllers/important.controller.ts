import { Request, Response } from "express";
import mongoose from "mongoose";
import { Important } from "../models/important.model";

/**
 * CREATE Important
 */
export const createImportant = async (req: Request, res: Response) => {
  try {
    const { name, blocks } = req.body;

    if (!name || !Array.isArray(blocks)) {
      return res.status(400).json({
        success: false,
        message: "Name and blocks array are required",
      });
    }

    const important = await Important.create({ name, blocks });

    return res.status(201).json({
      success: true,
      message: "Important content created successfully",
      data: important,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create important content",
    });
  }
};

/**
 * GET ALL Important
 */
export const getAllImportant = async (_req: Request, res: Response) => {
  try {
    const data = await Important.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Important content fetched successfully",
      data,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch important content",
    });
  }
};

/**
 * GET Important BY ID
 */
export const getImportantById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid important ID",
      });
    }

    const important = await Important.findById(id);

    if (!important) {
      return res.status(404).json({
        success: false,
        message: "Important content not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Important content fetched successfully",
      data: important,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch important content",
    });
  }
};

/**
 * UPDATE Important
 */
export const updateImportant = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid important ID",
      });
    }

    const updated = await Important.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Important content not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Important content updated successfully",
      data: updated,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update important content",
    });
  }
};

/**
 * DELETE Important
 */
export const deleteImportant = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid important ID",
      });
    }

    const deleted = await Important.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Important content not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Important content deleted successfully",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to delete important content",
    });
  }
};
