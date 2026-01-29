import mongoose, { Schema, Document } from "mongoose";

// Reuse the price structure for consistency
const priceSchema = new Schema({
    currency: { type: String, default: "AED" },
    amount_minor: { type: Number, required: true },
    amount_major: { type: String, required: true }
}, { _id: false });

const orderItemSchema = new Schema({
    product_id: { type: String, required: true },
    product_name: { type: String, required: true },
    product_slug: { type: String, required: true },
    tariff_name: { type: String, required: true }, // e.g., "VVIP", "Standard"

    categories: {
        ADULT: { quantity: Number, total_display_price: priceSchema },
        CHILD: { quantity: Number, total_display_price: priceSchema },
        INFANT: { quantity: Number, total_display_price: priceSchema }
    },

    addons: [{
        name: String,
        quantity: Number,
        total_price: priceSchema
    }],

    event_date: { type: String, required: true },
    start_time: { type: String, required: true },
    product_location: {
        address: String,
        geo_url: String
    },
    total_item_price: priceSchema
}, { _id: false });

const orderSchema = new Schema({
    order_number: { type: String, required: true, unique: true },

    user_id: { type: Schema.Types.ObjectId, ref: "User", default: null },
    cart_id: { type: Schema.Types.ObjectId, ref: "Cart" },

    customer_details: {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        nationality: { type: String }
    },

    pickup_details: {
        required: { type: Boolean, default: false },
        city: {
            type: String,
            enum: ["DUBAI", "SHARJAH"],
            required: function () {
                return this.pickup?.required === true;
            }
        },
        hotel_name: { type: String, },
        room_number: { type: String },
        special_instructions: { type: String },
        address: { type: String }
    },

    items: [orderItemSchema],

    payment_info: {
        status: {
            type: String,
            enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
            default: "PENDING"
        },
        transaction_id: { type: String },
        method: { type: String },
        paid_at: { type: Date }
    },


    total_amount: priceSchema,


    booking_status: {
        type: String,
        enum: ["CONFIRMED", "CANCELLED", "COMPLETED"],
        default: "CONFIRMED"
    }
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);