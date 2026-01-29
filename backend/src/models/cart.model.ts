import mongoose, { Schema } from "mongoose";

const priceSchema = new Schema({
    currency: { type: String, default: "AED" },
    amount_minor: { type: Number, required: true },
    amount_major: { type: String, required: true }  
}, { _id: false });

const cartItemSchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    service_tier_id: {
        type: Schema.Types.ObjectId,
        ref: "ServiceTier",
        required: true
    },

    product_name: { type: String, required: true },
    product_slug: { type: String, required: true },
    product_image_url: { type: String, required: true },
    tariff_name: { type: String, required: true },
    cancellation_policy_hours: { type: Number, default: 24 },

    product_location: {
        address: { type: String },
        geo_url: { type: String },
        latitude: { type: String },
        longitude: { type: String }
    },

    categories: {
        ADULT: {
            quantity: { type: Number, default: 1 },
            unit_display_price: priceSchema,
            total_display_price: priceSchema
        },
        CHILD: {
            quantity: { type: Number, default: 0 },
            unit_display_price: priceSchema,
            total_display_price: priceSchema
        },
        INFANT: {
            quantity: { type: Number, default: 0 },
            unit_display_price: priceSchema,
            total_display_price: priceSchema
        }
    },


    event_date: { type: String, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    display_start_time: { type: String, required: true },

    addons: [
        {
            name: { type: String },
            quantity: { type: Number, default: 1 },
            unit_price: priceSchema,
            total_price: priceSchema
        }
    ],

    total_item_price: priceSchema 
});

const cartSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User", default: null },
    items: [cartItemSchema],
    status: { type: String, enum: ["ACTIVE", "COMPLETED", "ABANDONED"], default: "ACTIVE" },
    total_cart_display_price: priceSchema
}, { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);