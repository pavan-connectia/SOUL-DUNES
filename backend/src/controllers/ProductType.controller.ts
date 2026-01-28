import { Request, Response } from "express";
import mongoose from "mongoose";
import { ProductGroup, ProductType } from "../models/productType.model";

export const createProductGroup = async (req: Request, res: Response) => {
  try {
    const group = await ProductGroup.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product group created successfully",
      data: group,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create product group",
    });
  }
};

export const getAllProductGroups = async (_req: Request, res: Response) => {
  try {
    const groups = await ProductGroup.find();

    res.status(200).json({
      success: true,
      message: "Product groups fetched successfully",
      data: groups,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product groups",
    });
  }
};

export const getProductGroupById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product group ID",
      });
    }

    const group = await ProductGroup.findById(id);
    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Product group not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product group fetched successfully",
      data: group,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product group",
    });
  }
};

export const updateProductGroup = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product group ID",
      });
    }

    const group = await ProductGroup.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Product group not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product group updated successfully",
      data: group,
    });
  } catch {
    res.status(400).json({
      success: false,
      message: "Failed to update product group",
    });
  }
};

export const deleteProductGroup = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product group ID",
      });
    }

    const group = await ProductGroup.findByIdAndDelete(id);
    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Product group not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product group deleted successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to delete product group",
    });
  }
};

export const createProductType = async (req: Request, res: Response) => {
  try {
    const type = await ProductType.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product type created successfully",
      data: type,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create product type",
    });
  }
};

export const getAllProductTypes = async (_req: Request, res: Response) => {
  try {
    const types = await ProductType.find().populate("group");

    res.status(200).json({
      success: true,
      message: "Product types fetched successfully",
      data: types,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product types",
    });
  }
};

export const getProductTypeById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product type ID",
      });
    }

    const type = await ProductType.findById(id).populate("group");
    if (!type) {
      return res.status(404).json({
        success: false,
        message: "Product type not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product type fetched successfully",
      data: type,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product type",
    });
  }
};

export const updateProductType = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product type ID",
      });
    }

    const type = await ProductType.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!type) {
      return res.status(404).json({
        success: false,
        message: "Product type not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product type updated successfully",
      data: type,
    });
  } catch {
    res.status(400).json({
      success: false,
      message: "Failed to update product type",
    });
  }
};

export const deleteProductType = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product type ID",
      });
    }

    const type = await ProductType.findByIdAndDelete(id);
    if (!type) {
      return res.status(404).json({
        success: false,
        message: "Product type not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product type deleted successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to delete product type",
    });
  }
};
