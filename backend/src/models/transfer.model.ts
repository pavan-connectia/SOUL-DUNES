import mongoose, { Schema, Document } from 'mongoose';


export interface IBlock {
    type: string; 
    data: any; 
}


export interface IRichText {
    blocks: IBlock[];
}

export interface ITransfer extends Document {
    name: string;     
    description: string;
    richText: IRichText;
    image: string;
    
}

const transferSchema = new Schema<ITransfer>({
    name: { type: String, required: true },
    description: { type: String },
    image:{ type: String, required: true },
    richText: {
        blocks: [Schema.Types.Mixed] 
    },
}, { timestamps: true });

export const Transfer = mongoose.model<ITransfer>('Transfer', transferSchema);