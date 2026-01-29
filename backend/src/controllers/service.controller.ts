import { Request, Response } from "express";
import mongoose from "mongoose";
import { Service } from "../models/service.model";

/**
 * CREATE Service
 */
export const createService = async (req: Request, res: Response) => {
  try {
    const {
      name,
      slug,
      identifier,
      duration,
      locationUrl,
      foodIncluded,
      transportation,
      transportChoice,
    } = req.body;

    // Basic required field validation
    if (
      !name ||
      !slug ||
      !identifier ||
      !duration ||
      !locationUrl ||
      foodIncluded === undefined ||
      transportation === undefined ||
      transportChoice === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const service = await Service.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error: any) {
    // Duplicate key error (name, slug, identifier)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: `Duplicate value for field: ${Object.keys(error.keyValue).join(", ")}`,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create service",
    });
  }
};

/**
 * GET ALL Services
 */
export const getAllServices = async (_req: Request, res: Response) => {
  try {
    const services = await Service.find()
      .populate("type")
      .populate("basePrices.serviceTier")
      .populate("assignmentPrices.serviceTier")
      .populate("infoIncludes.includeRef")
      .populate("infoComparative")
      .populate("infoImportant")
      .populate("infoTransfers")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Services fetched successfully",
      data: services,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};

/**
 * GET Service BY ID
 */
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const  id  = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const service = await Service.findById(id)
      .populate("type")
      .populate("basePrices.serviceTier")
      .populate("assignmentPrices.serviceTier")
      .populate("infoIncludes.includeRef")
      .populate("infoComparative")
      .populate("infoImportant")
      .populate("infoTransfers");

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service fetched successfully",
      data: service,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch service",
    });
  }
};

/**
 * UPDATE Service
 */
export const updateService = async (req: Request, res: Response) => {
  try {
    const  id  = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: `Duplicate value for field: ${Object.keys(error.keyValue).join(", ")}`,
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update service",
    });
  }
};

/**
 * DELETE Service
 */
export const deleteService = async (req: Request, res: Response) => {
  try {
    const  id  = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to delete service",
    });
  }
};
