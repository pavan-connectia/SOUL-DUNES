import mongoose, { Schema, Document } from 'mongoose';

export interface ITransportType extends Document {
    name: string;  
    description: string;
}

const transportTypeSchema = new Schema<ITransportType>({
    name: { type: String, required: true },
    description: { type: String }
}, { timestamps: true });

export const TransportType = mongoose.model<ITransportType>('TransportType', transportTypeSchema);