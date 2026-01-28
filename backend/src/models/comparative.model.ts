import mongoose, { Schema, Document } from "mongoose";

export interface IComparative extends Document {
  text: string;
  description: string | null;
  content: string[][];
}

const ComparativeSchema = new Schema<IComparative>(
  {
    text: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: null,
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
