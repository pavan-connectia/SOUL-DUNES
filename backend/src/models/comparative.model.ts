import mongoose, { Schema, Document } from "mongoose";

export interface IComparative extends Document {
  name: string;
  content: string[][];
}

const ComparativeSchema = new Schema<IComparative>(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: [[String]],
      required: true,
    },
  },
  { timestamps: true }
);

export const Comparative = mongoose.model<IComparative>(
  "Comparative",
  ComparativeSchema
);