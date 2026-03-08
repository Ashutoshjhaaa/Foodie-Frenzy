import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../CartContext/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTrash, FaPlus, FaMinus, FaTimes } from 'react-icons/fa'

const CartPage = () => {

    const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
    const cartTotal = totalAmount;
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className='min-h-screen overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d]'>
            <div className='max-w-7xl mx-auto'>
                <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 animate-fade-in-down'>
                    <span className='font-dancingscript block text-5xl sm:text-6xl md:text-7xl mb-2 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent'>
                        Your Cart
                    </span>
                </h1>

                {cartItems.length === 0 ? (
                    <div className='text-center animate-fade-in py-20'>
                        <p className='text-amber-100/80 text-xl mb-6'>Your cart is empty.</p>
                        <Link to='/menu' className='transition-all duration-300 text-amber-100 inline-flex items-center gap-2 hover:gap-3 hover:bg-amber-800/50 bg-amber-900/40 px-8 py-3 rounded-full font-cinzel text-sm uppercase border border-amber-500/30'>
                            Browse All Items
                        </Link>
                    </div>
                ) : (
                    <div className='space-y-12'>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6'>
                            {(cartItems || []).filter(item => (item.name || item.title) && (item.image || item.imageUrl)).map((item) => (
                                <motion.div
                                    key={item._id || item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className='group bg-amber-900/20 p-4 rounded-2xl border-4 border-dashed border-amber-500 backdrop-blur-sm flex flex-col items-center gap-4 transition-all duration-300 hover:border-solid hover:shadow-xl hover:shadow-amber-900/10 transform hover:-translate-y-1 animate-fade-in'
                                >
                                    <div className='w-24 h-24 flex-shrink-0 cursor-pointer relative overflow-hidden rounded-lg transition-transform duration-300'
                                        onClick={() => setSelectedImage(item.image || item.imageUrl)}>
                                        <img src={item.image || item.imageUrl} alt={item.name || item.title} className='w-full h-full object-contain filter drop-shadow-xl transition-transform duration-500 group-hover:scale-110' />
                                    </div>

                                    <div className='text-center w-full'>
                                        <h3 className='text-amber-100 font-serif italic text-sm sm:text-base leading-tight mb-1 truncate'>
                                            {item.name || item.title}
                                        </h3>
                                        <p className='text-amber-500 font-bold text-xs sm:text-sm mb-3'>
                                            ₹{typeof item.price === 'string' ? item.price : item.price?.toLocaleString()}
                                        </p>

                                        {/* Action Buttons Overlay or Row */}
                                        <div className='flex items-center justify-center gap-3 bg-amber-950/40 rounded-xl p-2 border border-amber-500/10'>
                                            <button
                                                onClick={() => updateQuantity(item, item.quantity - 1)}
                                                className='p-1 text-amber-500 hover:text-amber-400 disabled:opacity-30 transition-colors'
                                                disabled={item.quantity <= 1}
                                            >
                                                <FaMinus className='w-3 h-3' />
                                            </button>
                                            <span className='text-amber-100 font-bold text-sm min-w-[15px] font-serif'>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item, item.quantity + 1)}
                                                className='p-1 text-amber-500 hover:text-amber-400 transition-colors'
                                            >
                                                <FaPlus className='w-3 h-3' />
                                            </button>
                                            <div className='w-[1px] h-4 bg-amber-500/20 mx-1' />
                                            <button
                                                onClick={() => removeFromCart(item)}
                                                className='p-1 text-red-500 hover:text-red-400 transition-colors hover:scale-110'
                                                title="Remove"
                                            >
                                                <FaTrash className='w-3 h-3' />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Order Summary & Checkout Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='mt-12 p-8 rounded-3xl bg-gradient-to-r from-amber-900/40 to-amber-800/20 backdrop-blur-xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-black/40'
                        >
                            <div className='space-y-1 text-center md:text-left'>
                                <p className='text-amber-100/60 font-medium uppercase tracking-widest text-xs'>Summary Total</p>
                                <h2 className='text-4xl font-bold text-amber-400 drop-shadow-sm font-serif'>₹{(cartTotal || 0).toLocaleString()}</h2>
                            </div>
                            <div className='flex flex-wrap justify-center gap-4'>
                                <Link to='/menu' className='px-8 py-4 rounded-full border border-amber-500/30 text-amber-100 hover:bg-amber-500/10 transition-all font-medium backdrop-blur-sm'>
                                    Continue Shopping
                                </Link>
                                <Link to='/checkout' className='px-10 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-[#1a120b] font-bold shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-wider text-center'>
                                    Checkout Now
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a120b]/90 backdrop-blur-xl'
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, rotate: -5 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className='relative max-w-4xl max-h-[80vh]'
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                className='absolute -top-12 right-0 text-amber-100 hover:text-amber-400 p-2'
                                onClick={() => setSelectedImage(null)}
                            >
                                <FaTimes className='w-8 h-8' />
                            </button>
                            <img src={selectedImage} alt="Preview" className='w-full h-full object-contain rounded-3xl shadow-2xl border-4 border-amber-500/20 shadow-amber-500/10' />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}


export default CartPage
