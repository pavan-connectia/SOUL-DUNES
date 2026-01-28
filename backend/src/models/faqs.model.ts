import mongoose, { Schema, Document } from 'mongoose';


export interface IFAQ extends Document {
    text: string; 
    type: string | null;
    
}

const faqSchema = new Schema<IFAQ>({
    
    text: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        default: null 
    },
    
}, { timestamps: true });

export const FAQ = mongoose.model<IFAQ>('FAQ', faqSchema);