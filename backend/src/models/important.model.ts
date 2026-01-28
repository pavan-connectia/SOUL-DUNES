import mongoose, { Schema, Document } from 'mongoose';


export interface IImportant extends Document {
    name: string;
    description: string;
    type: string | null;
}

const importantSchema = new Schema<IImportant>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }

}, { timestamps: true });

export const Important = mongoose.model<IImportant>('Important', importantSchema);