import { Request, Response } from 'express';
import { Order } from '../models/order.model';
import { Cart } from '../models/cart.model';

// Helper: Generate a unique Order Number
const generateOrderNumber = (): string => {
    const prefix = 'NL';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${timestamp}-${random}`;
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { 
            cartId, 
            user_id, 
            customer_details, 
            pickup_details, 
            payment_method 
        } = req.body;

        // 1. Fetch and Validate the Cart
        const cart: any = await Cart.findById(cartId);
        if (!cart) {
            res.status(404).json({ error: "Cart not found." });
            return;
        }

        if (cart.items.length === 0) {
            res.status(400).json({ error: "Cannot checkout an empty cart." });
            return;
        }

        if (cart.status === "COMPLETED") {
            res.status(400).json({ error: "This cart has already been converted to an order." });
            return;
        }

        // 2. Validate Pickup Details if required
        // (Assuming the frontend determines if required based on Service settings)
        if (pickup_details?.required && !pickup_details.hotel_name) {
            res.status(400).json({ error: "Hotel name is required for pickup." });
            return;
        }

        // 3. Snapshot Cart Items into Order Items format
        const orderItems = cart.items.map((item: any) => ({
            product_id: item.product_id,
            product_name: item.product_name,
            product_slug: item.product_slug,
            tariff_name: item.tariff_name,
            categories: item.categories,
            addons: item.addons.map((addon: any) => ({
                name: addon.name,
                quantity: addon.quantity,
                total_price: addon.total_price
            })),
            event_date: item.event_date,
            start_time: item.start_time,
            product_location: item.product_location,
            total_item_price: item.total_item_price
        }));

        // 4. Create the Order object
        const newOrder = new Order({
            order_number: generateOrderNumber(),
            user_id: user_id || cart.user_id || null, // Link to user if available
            cart_id: cartId,
            customer_details,
            pickup_details,
            items: orderItems,
            total_amount: cart.total_cart_display_price,
            payment_info: {
                status: "PENDING",
                method: payment_method || "CARD"
            },
            booking_status: "CONFIRMED"
        });

        // 5. Save the Order
        await newOrder.save();

        // 6. Update Cart status
        // We set it to COMPLETED so the same cart cannot be checked out twice
        cart.status = "COMPLETED";
        await cart.save();

        // 7. Return Order Details
        // (In a real scenario, you would now trigger Stripe/Tabby and return a payment URL)
        res.status(201).json({
            message: "Order created successfully",
            order_number: newOrder.order_number,
            order_id: newOrder._id,
            total: newOrder.total_amount
        });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Update Payment Status (Webhook or Success Callback)
export const updatePaymentStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId, transactionId, status } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return;
        }

        if (!order.payment_info) {
            res.status(400).json({ error: "Payment info not found" });
            return;
        }

        order.payment_info.status = status; // e.g., "PAID"
        order.payment_info.transaction_id = transactionId;
        order.payment_info.paid_at = new Date();

        await order.save();
        res.json({ message: "Payment status updated", order });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Get Order Details for Customer
export const getOrderDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await Order.findOne({ 
            $or: [{ _id: req.params.id }, { order_number: req.params.id }] 
        });
        
        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return;
        }

        res.json(order);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};