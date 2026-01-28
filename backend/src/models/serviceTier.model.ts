import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceTier extends Document {
    name: string;     
    description: string;
    isActive: boolean;
}

const serviceTierSchema = new Schema<IServiceTier>({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true 
    },
    description: { 
        type: String 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    }
}, { timestamps: true });

export const ServiceTier = mongoose.model<IServiceTier>('ServiceTier', serviceTierSchema);