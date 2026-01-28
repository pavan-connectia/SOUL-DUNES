import mongoose, { Schema, Document } from 'mongoose';

export interface IProductGroup extends Document {
    name: string;
    slug: String
    description: string;
}

const productGroupSchema = new Schema<IProductGroup>({

    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String }
}, { timestamps: true });

export interface IProductType extends Document {

    name: string;
    slug: String
    description: string;
    group: mongoose.Types.ObjectId | IProductGroup;
}

const productTypeSchema = new Schema<IProductType>({


    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },


    group: {
        type: Schema.Types.ObjectId,
        ref: 'ProductGroup',
        required: true
    }
}, { timestamps: true });


export const ProductGroup = mongoose.model<IProductGroup>('ProductGroup', productGroupSchema);
export const ProductType = mongoose.model<IProductType>('ProductType', productTypeSchema);