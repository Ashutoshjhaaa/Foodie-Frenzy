import React, { useState } from 'react';
import { useCart } from '../../CartContext/CartContext';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import axios from 'axios';

const Checkout = () => {
    const { cartItems, totalAmount, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: '',
        paymentMethod: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const deliveryFee = totalAmount > 0 ? 40 : 0;
    const tax = totalAmount * 0.05;
    const total = totalAmount + tax + deliveryFee;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('Authentication token missing. Please login again.');
            setLoading(false);
            return;
        }

        const orderData = {
            ...formData,
            address: formData.street, // Mapping street to address for backend
            items: cartItems.map(item => ({
                item: {
                    name: item.name,
                    price: item.price,
                    imageUrl: item.image || item.imageUrl
                },
                quantity: item.quantity
            })),
            subtotal: totalAmount,
            tax: tax,
            total: total
        };

        try {
            const response = await axios.post("http://localhost:4000/api/orders", orderData, {
                headers: { token }
            });

            if (response.status === 201) {
                if (clearCart) clearCart();

                if (formData.paymentMethod === 'online' && response.data.checkouturl) {
                    window.location.replace(response.data.checkouturl);
                } else {
                    alert("Order placed successfully!");
                    navigate('/myorder');
                }
            }
        } catch (err) {
            console.error("Order Submission Error:", err);
            setError(err.response?.data?.message || "Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-16 bg-[#0a0a0a] min-h-screen text-white font-serif">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back to Cart Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link
                        to="/cart"
                        className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors font-cinzel text-sm uppercase tracking-widest group"
                    >
                        <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Cart
                    </Link>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl text-center font-cinzel text-amber-500 mb-12 tracking-widest"
                >
                    CHECKOUT
                </motion.h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Delivery Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-cinzel text-amber-200 border-b border-amber-500/30 pb-2 mb-6">
                            Delivery Information
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                required
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="First Name"
                                className="bg-black/50 border border-amber-500/20 rounded-lg p-3 focus:border-amber-500 outline-none transition-all"
                            />
                            <input
                                required
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Last Name"
                                className="bg-black/50 border border-amber-500/20 rounded-lg p-3 focus:border-amber-500 outline-none transition-all"
                            />
                        </div>

                        <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email Address"
                            className="w-full bg-black/50 border border-amber-500/20 rounded-lg p-3 focus:border-amber-500 outline-none transition-all"
                        />

                        <input
                            required
                            name="street"
                            value={formData.street}
                            onChange={handleInputChange}
                            placeholder="Street Address"
                            className="w-full bg-black/50 border border-amber-500/20 rounded-lg p-3 focus:border-amber-500 outline-none transition-all"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                required
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="City"
                                className="bg-black/50 border border-amber-500/20 rounded-lg p-3 focus:border-amber-500 outline-none transition-all"
                            />
                            <input
                                required
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                placeholder="State"
                                className="bg-black/50 border border-amber-500/20 rounded-lg p-3 focus:border-amber-500 outline-none transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                required
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                placeholder="Zip Code"
                                className="bg-black/50 border border-amber-500/20 rounded-lg p-3 focus:border-amber-500 outline-none transition-all"
                            />
                            <input
                                required
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                placeholder="Country"
                                className="bg-black/50 border border-amber-500/20 rounded-lg p-3 focus:border-amber-500 outline-none transition-all"
                            />
                        </div>

                        <input
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            className="w-full bg-black/50 border border-amber-500/20 rounded-lg p-3 focus:border-amber-500 outline-none transition-all"
                        />

                        {/* PAYMENT METHOD */}
                        <div className="mt-8">
                            <label className='block mb-2 font-cinzel text-amber-200'>Payment Method</label>
                            <select
                                name='paymentMethod'
                                value={formData.paymentMethod}
                                onChange={handleInputChange}
                                required
                                className='w-full bg-[#1a120b]/80 border border-amber-500/20 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-white transition-all shadow-inner'
                            >
                                <option value="" className="bg-[#1a120b]">Select Method</option>
                                <option value="cod" className="bg-[#1a120b]">Cash on Delivery</option>
                                <option value="online" className="bg-[#1a120b]">Online Payment</option>
                            </select>
                        </div>

                        {error && <p className='text-red-400 mt-2 text-sm italic'>{error}</p>}
                    </motion.div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-black/40 border border-amber-500/10 p-8 rounded-2xl backdrop-blur-xl h-fit sticky top-24"
                    >
                        <h2 className="text-2xl font-cinzel text-amber-200 border-b border-amber-500/30 pb-4 mb-6">
                            Cart Totals
                        </h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>₹{totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Tax (5%)</span>
                                <span>₹{(totalAmount * 0.05).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Delivery Fee</span>
                                <span>₹{deliveryFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-2xl font-cinzel text-white pt-4 border-t border-white/10">
                                <span>Total</span>
                                <span className="text-amber-500">₹{(totalAmount + (totalAmount * 0.05) + deliveryFee).toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-cinzel py-4 rounded-xl uppercase tracking-widest font-bold shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
                        >
                            PROCEED TO PAYMENT
                        </button>

                        <div className="mt-8">
                            <h3 className="text-amber-200/60 font-cinzel text-sm uppercase mb-4 tracking-tighter">Order Items ({cartItems.length})</h3>
                            <div className="max-h-48 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-400 truncate max-w-[150px]">{item.name} x {item.quantity}</span>
                                        <span className="text-amber-500/80">₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;

