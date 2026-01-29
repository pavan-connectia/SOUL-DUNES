import { Request, Response } from 'express';
import { Cart } from '../models/cart.model';
import { Service } from '../models/service.model';
import { ServiceTier } from '../models/serviceTier.model';
import { Transfer } from "../models/transfer.model"; 

interface IPrice {
    currency: string;
    amount_minor: number;
    amount_major: string;
}

interface IParticipants {
    adults: number;
    children?: number;
    infants?: number;
}

interface IAddonInput {
    id?: string; 
    name: string;
    quantity?: number;
}

interface ICategoryInfo {
    quantity: number;
    unit_display_price: IPrice;
    total_display_price: IPrice;
}

interface IProcessedAddon {
    name: string;
    quantity: number;
    unit_price: IPrice;
    total_price: IPrice;
}

interface ICalculatedPricing {
    product_info: {
        name: string;
        slug: string;
        image: string;
        location: string;
        geo: string;
        cancel: number;
    };
    tierName: string;
    categories: {
        ADULT: ICategoryInfo;
        CHILD: ICategoryInfo;
        INFANT: ICategoryInfo;
    };
    processedAddons: IProcessedAddon[];
    totalItemAmount: IPrice;
}


const formatPrice = (amount: number): IPrice => ({
    currency: "AED",
    amount_minor: Math.round(amount * 100),
    amount_major: amount.toFixed(2)
});

const calculateItemPricing = async (
    productId: string,
    tierId: string,
    participants: IParticipants,
    selectedAddons: IAddonInput[],
    payloadImage?: string
): Promise<ICalculatedPricing> => {
    
    const service: any = await Service.findById(productId).populate('basePrices.serviceTier infoTransfers');
    const tier: any = await ServiceTier.findById(tierId);

    if (!service || !tier) throw new Error("Service or Tier not found");

    const pricing = service.basePrices.find((bp: any) => bp.serviceTier._id.toString() === tierId);
    if (!pricing) throw new Error("Pricing for this tier not found");

    const tierName = tier.name.toUpperCase();
    const isHighTier = ["GOLD", "PLATINUM", "VVIP"].includes(tierName);

    const adultTotal = (pricing.adultPrice || 0) * participants.adults;
    const childTotal = (pricing.childPrice || 0) * (participants.children || 0);
    const infantTotal = (pricing.infantPrice || 0) * (participants.infants || 0);

    const categories = {
        ADULT: {
            quantity: participants.adults,
            unit_display_price: formatPrice(pricing.adultPrice),
            total_display_price: formatPrice(adultTotal)
        },
        CHILD: {
            quantity: participants.children || 0,
            unit_display_price: formatPrice(pricing.childPrice || 0),
            total_display_price: formatPrice(childTotal)
        },
        INFANT: {
            quantity: participants.infants || 0,
            unit_display_price: formatPrice(pricing.infantPrice || 0),
            total_display_price: formatPrice(infantTotal)
        }
    };

    let addonsTotal = 0;
    const processedAddons: IProcessedAddon[] = await Promise.all(selectedAddons.map(async (addonInput) => {
        let dbPrice = 0;
        let finalName = addonInput.name;

        if (addonInput.id) {
            const transferDoc = await Transfer.findById(addonInput.id);
            if (transferDoc) {
                dbPrice = transferDoc.price || 0;
                finalName = transferDoc.name;
            }
        }

        let unitPrice = dbPrice;
        let totalAddonPrice = 0;

        if (finalName === "Private Vehicle") {
            const totalPax = participants.adults + (participants.children || 0);
            const vehiclesNeeded = Math.ceil(totalPax / 6);
            
            unitPrice = isHighTier ? 0 : (unitPrice || pricing.transferPrice || 0);
            totalAddonPrice = unitPrice * vehiclesNeeded;
        } else if (finalName === "Shared Vehicle") {
            unitPrice = 0;
            totalAddonPrice = 0;
        } else {
            totalAddonPrice = unitPrice * (addonInput.quantity || 1);
        }

        addonsTotal += totalAddonPrice;
        return {
            name: finalName,
            quantity: addonInput.quantity || 1,
            unit_price: formatPrice(unitPrice),
            total_price: formatPrice(totalAddonPrice)
        };
    }));

    const totalItemAmount = adultTotal + childTotal + infantTotal + addonsTotal;

    return {
        product_info: {
            name: service.name,
            slug: service.slug,
            image: service.product_image_url || payloadImage || "", 
            location: service.includes?.city?.name || "Dubai",
            geo: service.locationUrl,
            cancel: service.freeCancellationHours || 24
        },
        tierName,
        categories,
        processedAddons,
        totalItemAmount: formatPrice(totalItemAmount)
    };
};

export const addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { 
            product_id, 
            service_tier_id, 
            categories, 
            event_date, 
            start_time, 
            addons = [], 
            user_id, 
            cartId, 
            product_image_url 
        } = req.body;

        const participants: IParticipants = {
            adults: categories?.ADULT?.quantity || 0,
            children: categories?.CHILD?.quantity || 0,
            infants: categories?.INFANT?.quantity || 0
        };

        const data = await calculateItemPricing(
            product_id, 
            service_tier_id, 
            participants, 
            addons, 
            product_image_url
        );

        const newItem = {
            product_id,
            service_tier_id,
            product_name: data.product_info.name,
            product_slug: data.product_info.slug,
            product_image_url: data.product_info.image,
            tariff_name: data.tierName,
            product_location: { 
                address: data.product_info.location, 
                geo_url: data.product_info.geo 
            },
            categories: data.categories,
            event_date,
            start_time,
            end_time: "22:00",
            display_start_time: req.body.display_start_time || "14:00-14:30",
            addons: data.processedAddons,
            total_item_price: data.totalItemAmount
        };

        let cart: any = null;

        if (user_id) {
            cart = await Cart.findOne({ user_id, status: "ACTIVE" });
        }
        
        if (!cart && cartId) {
            cart = await Cart.findOne({ _id: cartId, status: "ACTIVE" });
        }

        if (!cart) {
            cart = new Cart({ 
                user_id: user_id || null, 
                items: [newItem], 
                total_cart_display_price: data.totalItemAmount 
            });
        } else {
            cart.items.push(newItem as any);

            if (user_id && !cart.user_id) {
                cart.user_id = user_id;
            }


            const totalCents = cart.items.reduce((sum: number, item: any) => 
                sum + item.total_item_price.amount_minor, 0);
            
            cart.total_cart_display_price = formatPrice(totalCents / 100);
        }

        await cart.save();

        res.status(201).json(cart);

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cartId, itemId } = req.params;
        const cart = await Cart.findById(cartId);
        if (!cart) { res.status(404).json({ message: "Cart not found" }); return; }

        cart.items = cart.items.filter((i: any) => i._id.toString() !== itemId) as any;

        const total = cart.items.reduce((sum, item: any) => sum + (item.total_item_price.amount_minor / 100), 0);
        cart.total_cart_display_price = formatPrice(total);

        await cart.save();
        res.json(cart);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const cart = await Cart.findById(req.params.id);
        res.json(cart || { message: "Cart empty" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};