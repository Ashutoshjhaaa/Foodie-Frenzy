import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import axios from 'axios';
import { dummyMenuData as menuData1 } from '../assets/OmDD';
import { dummyMenuData as menuData2 } from '../assets/OmhDD';

const CartContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Helper to find item metadata across all dummy data sources
const getItemMetadata = (id) => {
    const allCategories = [...Object.values(menuData1), ...Object.values(menuData2)];
    for (const category of allCategories) {
        const item = category.find(i => i.id === id);
        if (item) return item;
    }
    return null;
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            return action.payload;
        case 'ADD_ITEM_LOCAL': {
            const { item, quantity } = action.payload;
            const exists = state.find(ci => ci.id === item.id);
            if (exists) {
                return state.map(ci => ci.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci);
            }
            return [...state, { ...item, quantity }];
        }
        case 'REMOVE_ITEM_LOCAL':
            return state.filter(ci => ci.id !== action.payload);
        case 'UPDATE_QUANTITY_LOCAL': {
            const { id, quantity } = action.payload;
            return state.map(ci => ci.id === id ? { ...ci, quantity } : ci);
        }
        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
};

const initializer = () => {
    try {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, dispatch] = useReducer(cartReducer, [], initializer);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const fetchCartFromServer = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return;
        try {
            const res = await axios.post(`${API_URL}/api/cart/get`, {}, {
                headers: { token }
            });
            if (res.data.success) {
                const serverCart = res.data.cartData; // This is { itemId: quantity }
                const reconciledCart = Object.entries(serverCart).map(([itemId, quantity]) => {
                    const metadata = getItemMetadata(itemId);
                    if (metadata) {
                        return { ...metadata, quantity };
                    }
                    return { id: itemId, quantity }; // Fallback if metadata not found
                }).filter(item => item.name || item.title); // Basic filter for valid items

                dispatch({ type: 'SET_CART', payload: reconciledCart });
            }
        } catch (err) {
            console.error("Fetch Cart Error", err);
        }
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: 'CLEAR_CART' });
        localStorage.removeItem('cart');
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            fetchCartFromServer();
        }
    }, [fetchCartFromServer]);

    const addToCart = useCallback(async (item, quantity = 1) => {
        const token = localStorage.getItem('authToken');

        // Ensure price is a number if it comes as a string like "₹140"
        const cleanPrice = typeof item.price === 'string'
            ? parseFloat(item.price.replace(/[^\d.]/g, ''))
            : item.price;

        const itemWithNumericPrice = { ...item, price: cleanPrice || 0 };

        dispatch({ type: 'ADD_ITEM_LOCAL', payload: { item: itemWithNumericPrice, quantity } });

        if (token) {
            try {
                await axios.post(`${API_URL}/api/cart/add`, { itemId: item.id, quantity }, {
                    headers: { token }
                });
            } catch (err) {
                console.error("Add to Cart Sync Error", err);
            }
        }
    }, []);

    const removeFromCart = useCallback(async (item) => {
        const token = localStorage.getItem('authToken');
        dispatch({ type: 'REMOVE_ITEM_LOCAL', payload: item.id });

        if (token) {
            try {
                await axios.post(`${API_URL}/api/cart/remove`, { itemId: item.id }, {
                    headers: { token }
                });
            } catch (err) {
                console.error("Remove from Cart Sync Error", err);
            }
        }
    }, []);

    const updateQuantity = useCallback(async (item, quantity) => {
        const token = localStorage.getItem('authToken');
        dispatch({ type: 'UPDATE_QUANTITY_LOCAL', payload: { id: item.id, quantity } });

        if (token) {
            try {
                await axios.post(`${API_URL}/api/cart/update`, { itemId: item.id, quantity }, {
                    headers: { token }
                });
            } catch (err) {
                console.error("Update Cart Sync Error", err);
            }
        }
    }, []);

    const totalItems = (cartItems || []).reduce((sum, ci) => sum + (ci.quantity || 0), 0);
    const totalAmount = (cartItems || []).reduce((sum, ci) => {
        const price = typeof ci.price === 'string'
            ? parseFloat(ci.price.replace(/[^\d.]/g, ''))
            : ci.price;
        return sum + ((price || 0) * (ci.quantity || 0));
    }, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalAmount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
