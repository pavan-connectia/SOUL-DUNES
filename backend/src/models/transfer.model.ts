import mongoose, { Schema, Document } from 'mongoose';

export interface ITransfer extends Document {
    name: string;
    image: string;
    blocks: Array<{
        type: string;
        data: any;
    }>;
}

const transferSchema = new Schema<ITransfer>({
    name: {
        type: String,
        required: true
    },
    image: {
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

export const Transfer = mongoose.model<ITransfer>('Transfer', transferSchema);