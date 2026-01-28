import { Request, Response } from "express";
import mongoose from "mongoose";
import { Comparative } from "../models/comparative.model";

/**
 * CREATE Comparative
 */
export const createComparative = async (req: Request, res: Response) => {
  try {
    const { name, content } = req.body;

    if (!name || !content || !Array.isArray(content)) {
      return res.status(400).json({
        success: false,
        message: "Name and content (2D array) are required",
      });
    }

    const comparative = await Comparative.create({ name, content });

    res.status(201).json({
      success: true,
      message: "Comparative created successfully",
      data: comparative,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create comparative",
    });
  }
};

/**
 * GET ALL Comparatives
 */
export const getAllComparatives = async (_req: Request, res: Response) => {
  try {
    const comparatives = await Comparative.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Comparatives fetched successfully",
      data: comparatives,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch comparatives",
    });
  }
};

/**
 * GET Comparative BY ID
 */
export const getComparativeById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comparative ID",
      });
    }

    const comparative = await Comparative.findById(id);

    if (!comparative) {
      return res.status(404).json({
        success: false,
        message: "Comparative not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Comparative fetched successfully",
      data: comparative,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch comparative",
    });
  }
};

/**
 * UPDATE Comparative
 */
export const updateComparative = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { name, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comparative ID",
      });
    }

    if (content && !Array.isArray(content)) {
      return res.status(400).json({
        success: false,
        message: "Content must be a 2D array of strings",
      });
    }

    const comparative = await Comparative.findByIdAndUpdate(
      id,
      { name, content },
      { new: true, runValidators: true }
    );

    if (!comparative) {
      return res.status(404).json({
        success: false,
        message: "Comparative not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Comparative updated successfully",
      data: comparative,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update comparative",
    });
  }
};

/**
 * DELETE Comparative
 */
export const deleteComparative = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comparative ID",
      });
    }

    const comparative = await Comparative.findByIdAndDelete(id);

    if (!comparative) {
      return res.status(404).json({
        success: false,
        message: "Comparative not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Comparative deleted successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to delete comparative",
    });
  }
};
