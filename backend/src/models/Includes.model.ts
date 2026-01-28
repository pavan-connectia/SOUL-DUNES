import mongoose, { Schema, Document } from 'mongoose';


export interface IIncludes extends Document {
    text: string; 
    image: string | null;
    
}

const includesSchema = new Schema<IIncludes>({
    
    text: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    
}, { timestamps: true });

export const Includes = mongoose.model<IIncludes>('Includes', includesSchema);