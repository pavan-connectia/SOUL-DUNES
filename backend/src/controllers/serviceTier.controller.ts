import { Request, Response } from "express";
import mongoose from "mongoose";
import { ServiceTier } from "../models/serviceTier.model";

/* ---------------- CREATE ---------------- */
export const createServiceTier = async (req: Request, res: Response) => {
  try {
    const tier = await ServiceTier.create(req.body);

    res.status(201).json({
      success: true,
      message: "Service tier created successfully",
      data: tier,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Service tier with this name already exists",
      });
    }

    res.status(400).json({
      success: false,
      message: error.message || "Failed to create service tier",
    });
  }
};

/* ---------------- GET ALL ---------------- */
export const getAllServiceTiers = async (_req: Request, res: Response) => {
  try {
    const tiers = await ServiceTier.find();

    res.status(200).json({
      success: true,
      message: "Service tiers fetched successfully",
      data: tiers,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch service tiers",
    });
  }
};

/* ---------------- GET BY ID ---------------- */
export const getServiceTierById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service tier ID",
      });
    }

    const tier = await ServiceTier.findById(id);
    if (!tier) {
      return res.status(404).json({
        success: false,
        message: "Service tier not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service tier fetched successfully",
      data: tier,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch service tier",
    });
  }
};

/* ---------------- UPDATE ---------------- */
export const updateServiceTier = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service tier ID",
      });
    }

    const tier = await ServiceTier.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tier) {
      return res.status(404).json({
        success: false,
        message: "Service tier not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service tier updated successfully",
      data: tier,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Service tier with this name already exists",
      });
    }

    res.status(400).json({
      success: false,
      message: "Failed to update service tier",
    });
  }
};

/* ---------------- DELETE ---------------- */
export const deleteServiceTier = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service tier ID",
      });
    }

    const tier = await ServiceTier.findByIdAndDelete(id);
    if (!tier) {
      return res.status(404).json({
        success: false,
        message: "Service tier not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service tier deleted successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to delete service tier",
    });
  }
};
