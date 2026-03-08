import Stripe from 'stripe'
import Order from '../models/orderModel.js'
import 'dotenv/config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// CREATE ORDER Function

export const createOrder = async (req, res) => {
    try {
        const {
            firstName, lastName, email, phone, address, city, zipCode, paymentMethod, subtotal, tax, total, items
        } = req.body;

        // Handle potential naming mismatch from request body (lastname vs lastName)
        const finalLastName = lastName || req.body.lastname;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Invalid or empty items array' })
        }
        const orderItems = items.map(({ item, name, price, imageUrl, quantity }) => {
            const base = item || {};
            return {
                item: {
                    name: base.name || name || 'unknown',
                    price: Number(base.price ?? price) || 0,
                    imageUrl: base.imageUrl || imageUrl || '',
                },
                quantity: Number(quantity) || 1,

            }



        });
        // DEFINE SHIPPING COST

        const shippingCost = 0;
        let newOrder;

        if (paymentMethod === 'online') {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',

                line_items: orderItems.map(o => ({
                    price_data: {
                        currency: 'inr',
                        product_data: { name: String(o.item.name).substring(0, 250) },
                        unit_amount: Math.round(o.item.price * 100)
                    },
                    quantity: o.quantity,
                })),
                customer_email: email,
                success_url: `${process.env.FRONTEND_URL}/myorder/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.FRONTEND_URL}/checkout?payment_status=cancel`,
                metadata: { firstName, lastName: finalLastName, email, phone }

            })
            newOrder = new Order({
                user: req.user?._id || req.body.userId,
                firstName, lastName: finalLastName, phone, email, address, city, zipCode, paymentMethod, subtotal, tax, total, shipping: shippingCost, items: orderItems, paymentIntentId: session.payment_intent, sessionId: session.id,
                paymentStatus: 'pending'
            });
            await newOrder.save();
            return res.status(201).json({ order: newOrder, checkouturl: session.url })

        }
        // IF PAYMENT IS DONE COD
        newOrder = new Order({
            user: req.user?._id || req.body.userId,
            firstName, lastName: finalLastName, phone, email, address, city, zipCode, paymentMethod, subtotal, tax, total, shipping: shippingCost, items: orderItems,
            paymentStatus: 'succeeded'
        });
        await newOrder.save();
        return res.status(201).json({ order: newOrder, checkouturl: null })


    }
    catch (error) {
        console.error('CreateOrder Error:', error);
        res.status(500).json({ message: 'Server error ', error: error.message })

    }
};

// CONFROM PAYMENT
export const confirmPayment = async (req, res) => {
    try {
        const { session_id } = req.query
        if (!session_id) return res.status(400).json({ message: 'Session ID is required' });
        const session = await stripe.checkout.sessions.retrieve(session_id)
        if (session.payment_status === 'paid') {
            const order = await Order.findOneAndUpdate(
                { sessionId: session_id },
                { paymentStatus: 'succeeded' },
                { new: true }
            );
            if (!order) return res.status(404).json({ message: 'Order not found' })
            return res.json(order)
        }
        return res.status(400).json({ message: 'Payment not completed' })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message })
    }
}

// GET ORDER
export const getOrder = async (req, res) => {
    try {
        const userId = req.user?._id || req.body.userId;
        console.log('Fetching orders for UserID:', userId);

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID not found in request" });
        }

        // Ensure the user ID is treated correctly in the filter
        const filter = { user: userId };
        const rawOrders = await Order.find(filter).sort({ createdAt: -1 }).lean();

        console.log(`Found ${rawOrders.length} orders for user ${userId}`);

        // FORMAT
        const formatted = rawOrders.map(o => ({
            ...o,
            items: (Array.isArray(o.items) ? o.items : []).map(i => ({
                _id: i?._id,
                item: i?.item || { name: 'Unknown', price: 0, imageUrl: '' },
                quantity: i?.quantity || 1,
            })),
            createdAt: o.createdAt,
            paymentStatus: o.paymentStatus
        }));

        res.json({ success: true, data: formatted });
    }
    catch (error) {
        console.error('getOrder Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

// Addmine GET ALL ORDERS
export const getAllOrders = async (req, res) => {
    try {
        const raw = await Order.find().sort({ createdAt: -1 }).lean()
        const formatted = raw.map(o => ({
            _id: o._id,
            user: o.user,
            firstName: o.firstName,
            lastName: o.lastName,
            phone: o.phone,
            email: o.email,
            address: o.address ?? o.shippingAddress?.address ?? '',
            city: o.city ?? o.shippingAddress?.city ?? '',
            zipCode: o.zipCode ?? o.shippingAddress?.zipCode ?? '',

            paymentMethod: o.paymentMethod,
            paymentStatus: o.paymentStatus,
            status: o.status,
            createdAt: o.createdAt,

            items: (Array.isArray(o.items) ? o.items : []).map(i => ({
                _id: i?._id,
                item: i?.item || { name: 'Unknown', price: 0, imageUrl: '' },
                quantity: i?.quantity || 1,
            }))
        }));

        res.json(formatted)

    } catch (error) {
        console.error('getAllOrders Error:', error);
        res.status(500).json({ message: 'Server Error ', error: error.message })
    }
}
// UPDATE ORDER WITHOUT TOKEN FROM ADMIN PANEL
export const updateAnyOrder = async (req, res) => {
    try {
        const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }

        );
        if (!updated) {
            return res.status(404).json({ message: 'Order not found' })
        }
        res.json(updated)
    }
    catch (error) {
        console.error('updateAnyOrder Error:', error);
        res.status(500).json({ message: 'Server Error ', error: error.message })


    }
}
export const updateOrderStatus = updateAnyOrder;
// GET ORDER BY ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (!order.user.equals(req.user._id)) {
            return res.status(403).json({ message: 'Access denied' })
        }
        if (req.query.email && order.email !== req.query.email) {
            return res.status(403).json({ message: 'Access denied' })
        }
        res.json(order)
    }
    catch (error) {
        console.error('getOrderById Error:', error);
        res.status(500).json({ message: 'Server Error ', error: error.message })



    }
}

// UPDATE BY ID
export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (!order.user.equals(req.user._id)) {
            return res.status(403).json({ message: 'Access denied' })
        }
        if (req.body.email && order.email !== req.body.email) {
            return res.status(403).json({ message: 'Access denied' })
        }
        const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated)


    }
    catch (error) {
        console.error('getdateOrderById Error:', error);
        res.status(500).json({ message: 'Server Error ', error: error.message })
    }
}

