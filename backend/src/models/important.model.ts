import mongoose, { Schema, Document } from 'mongoose';

export interface IImportant extends Document {
    name: string; 
    blocks: Array<{
        type: string;
        data: any;
    }>;
}

const importantSchema = new Schema<IImportant>({
    name: {
        type: String,
        required: true
    },
    blocks: [
        {
            type: { type: String, required: true },
            data: { type: Schema.Types.Mixed, required: true } 
        }
    ]
}, { timestamps: true });

export const Important = mongoose.model<IImportant>('Important', importantSchema);