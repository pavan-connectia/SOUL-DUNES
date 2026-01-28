import { Request, Response } from "express";
import mongoose from "mongoose";
import { Transfer } from "../models/transfer.model";

/**
 * CREATE Transfer
 */
export const createTransfer = async (req: Request, res: Response) => {
  try {
    const { name, image, blocks } = req.body;

    if (!name || !image || !Array.isArray(blocks)) {
      return res.status(400).json({
        success: false,
        message: "Name, image and blocks array are required",
      });
    }

    const transfer = await Transfer.create({
      name,
      image,
      blocks,
    });

    return res.status(201).json({
      success: true,
      message: "Transfer created successfully",
      data: transfer,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create transfer",
    });
  }
};

/**
 * GET ALL Transfers
 */
export const getAllTransfers = async (_req: Request, res: Response) => {
  try {
    const transfers = await Transfer.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Transfers fetched successfully",
      data: transfers,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch transfers",
    });
  }
};

/**
 * GET Transfer BY ID
 */
export const getTransferById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transfer ID",
      });
    }

    const transfer = await Transfer.findById(id);

    if (!transfer) {
      return res.status(404).json({
        success: false,
        message: "Transfer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transfer fetched successfully",
      data: transfer,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch transfer",
    });
  }
};

/**
 * UPDATE Transfer
 */
export const updateTransfer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transfer ID",
      });
    }

    const updatedTransfer = await Transfer.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTransfer) {
      return res.status(404).json({
        success: false,
        message: "Transfer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transfer updated successfully",
      data: updatedTransfer,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update transfer",
    });
  }
};

/**
 * DELETE Transfer
 */
export const deleteTransfer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transfer ID",
      });
    }

    const deleted = await Transfer.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Transfer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transfer deleted successfully",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to delete transfer",
    });
  }
};
