import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body;
        const userData = await userModel.findById(userId);
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        
        // Mongoose Map support or plain object
        if (cartData instanceof Map) {
            const currentQty = cartData.get(itemId) || 0;
            cartData.set(itemId, currentQty + (quantity || 1));
        } else {
            if (!cartData[itemId]) {
                cartData[itemId] = (quantity || 1);
            } else {
                cartData[itemId] += (quantity || 1);
            }
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added To Cart", cartData });
    } catch (error) {
        console.error("Add to Cart Error:", error);
        res.json({ success: false, message: "Internal Server Error" });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const userData = await userModel.findById(userId);
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (cartData instanceof Map) {
            cartData.delete(itemId);
        } else {
            delete cartData[itemId];
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed From Cart", cartData });
    } catch (error) {
        console.error("Remove from Cart Error:", error);
        res.json({ success: false, message: "Internal Server Error" });
    }
};

// Update item quantity in cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body;
        const userData = await userModel.findById(userId);
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (quantity <= 0) {
            if (cartData instanceof Map) {
                cartData.delete(itemId);
            } else {
                delete cartData[itemId];
            }
        } else {
            if (cartData instanceof Map) {
                cartData.set(itemId, quantity);
            } else {
                cartData[itemId] = quantity;
            }
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated", cartData });
    } catch (error) {
        console.error("Update Cart Error:", error);
        res.json({ success: false, message: "Internal Server Error" });
    }
};

// Get user cart data
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, cartData: userData.cartData || {} });
    } catch (error) {
        console.error("Get Cart Error:", error);
        res.json({ success: false, message: "Internal Server Error" });
    }
};

export { addToCart, removeFromCart, getCart, updateCart };
