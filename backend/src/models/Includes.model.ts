import mongoose, { Schema, Document } from 'mongoose';

export interface IIncludes extends Document {
    name: string;
    fileUrl: string;
    previewImageUrl: string;
}

const includesSchema = new Schema<IIncludes>({
    name: { type: String, required: true },
    fileUrl: { type: String, required: true },
    previewImageUrl: { type: String, required: true }
}, { timestamps: true });

export const Includes = mongoose.model<IIncludes>('Includes', includesSchema);