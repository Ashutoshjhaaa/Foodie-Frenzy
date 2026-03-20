import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiUser, FiMapPin, FiBox, FiCheckCircle } from 'react-icons/fi'
import axios from 'axios'
import { motion } from 'framer-motion'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const MyOrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRefetching, setIsRefetching] = useState(false);

    const getPaymentMethodDetails = (method) => {
        switch (method?.toLowerCase()) {
            case 'cod':
                return {
                    label: 'COD',
                    class: 'bg-amber-950/40 text-amber-500 border-amber-500/20 font-bold'
                };
            case 'card':
                return {
                    label: 'Credit/Debit Card',
                    class: 'bg-blue-950/40 text-blue-400 border-blue-500/20'
                };
            case 'upi':
                return {
                    label: 'UPI Payment',
                    class: 'bg-purple-950/40 text-purple-400 border-purple-500/20'
                };
            default:
                return {
                    label: 'Online',
                    class: 'bg-green-950/40 text-green-400 border-green-500/20'
                };
        }
    }

    const fetchOrders = async (isRefetch = false) => {
        if (isRefetch) setIsRefetching(true);
        else setLoading(true);

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError("Please login to view your orders");
                setLoading(false);
                setIsRefetching(false);
                return;
            }
            const response = await axios.get(`${API_URL}/api/orders`, {
                headers: { token: token }
            });
            if (response.data.success) {
                setOrders(response.data.data);
                setError(null);
            }
        } catch (err) {
            console.error("Order Fetch Error:", err);
            const errMsg = err.response?.data?.message || err.message || "Failed to fetch orders";
            setError(errMsg);
        } finally {
            setLoading(false);
            setIsRefetching(false);
        }
    }

    // FETCH ORDERS FOR A USER
    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) return (
        <div className='min-h-screen bg-[#1a120b] flex items-center justify-center'>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className='h-12 w-12 border-t-2 border-b-2 border-amber-500 rounded-full'
            />
        </div>
    )

    if (error) return (
        <div className='min-h-screen bg-[#1a120b] flex flex-col items-center justify-center text-white text-xl gap-6'>
            <p className='text-amber-100/60 font-serif italic'>{error}</p>
            <Link to='/' className='flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-all uppercase tracking-widest text-sm border-b border-amber-500/0 hover:border-amber-500/100 pb-1'>
                <FiArrowLeft className='text-xl' />
                <span>Go Back Home</span>
            </Link>
        </div>
    )

    return (
        <div className='min-h-screen bg-[#1a120b] py-16 px-4 md:px-8'>
            <style>
                {`
                    .custom-scrollbar::-webkit-scrollbar { height: 6px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(245, 158, 11, 0.2); border-radius: 10px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(245, 158, 11, 0.4); }
                `}
            </style>

            <div className='mx-auto max-w-[1400px]'>
                <div className='flex justify-between items-center mb-10'>
                    <Link to='/' className='flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-all uppercase tracking-[0.15em] text-xs font-bold'>
                        <FiArrowLeft className='text-lg' />
                        <span>Back to Home</span>
                    </Link>
                    <button
                        onClick={() => fetchOrders(true)}
                        disabled={refetching}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-500/20 text-amber-500 hover:bg-amber-500/10 transition-all uppercase text-[10px] tracking-widest font-black ${refetching ? 'opacity-50' : ''}`}
                    >
                        <FiRefreshCw className={`text-lg ${refetching ? 'animate-spin' : ''}`} />
                        <span>{refetching ? 'Syncing...' : 'Refresh History'}</span>
                    </button>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-[#2a1e14]/40 border border-amber-900/30 rounded-[2.5rem] p-6 md:p-14 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden'
                >
                    <div className='absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] -mr-32 -mt-32' />

                    <h1 className='text-3xl md:text-5xl font-bold text-amber-500 mb-16 text-center uppercase tracking-[0.3em] font-cinzel'>
                        Order History
                    </h1>

                    <div className='overflow-x-auto custom-scrollbar pb-4'>
                        {orders.length === 0 ? (
                            <div className='flex flex-col items-center justify-center min-h-[350px]'>
                                <FiBox className='text-6xl text-amber-900/30 mb-6' />
                                <p className='text-amber-100/40 text-lg font-serif italic'>Your order history is empty.</p>
                                <Link to='/menu' className='mt-8 px-12 py-3.5 rounded-full bg-amber-900/40 border border-amber-500/20 text-amber-100 hover:bg-amber-800/60 transition-all uppercase text-xs tracking-[0.2em] font-bold'>
                                    Explore Menu
                                </Link>
                            </div>
                        ) : (
                            <table className='w-full text-left border-separate border-spacing-y-4'>
                                <thead>
                                    <tr className='text-amber-500 text-[10px] uppercase tracking-[0.2em] font-black border-b border-amber-900/10'>
                                        <th className='px-6 py-4'>Order ID</th>
                                        <th className='px-6 py-4'>Customer</th>
                                        <th className='px-6 py-4'>Address</th>
                                        <th className='px-6 py-4'>Items</th>
                                        <th className='px-6 py-4'>Total Items</th>
                                        <th className='px-6 py-4'>Price</th>
                                        <th className='px-6 py-4 text-center'>Payment</th>
                                        <th className='px-6 py-4 text-center'>Status</th>
                                    </tr>
                                </thead>
                                <tbody className='text-amber-100/90'>
                                    {orders.map((order) => {
                                        const totalQty = (Array.isArray(order.items) ? order.items : []).reduce((acc, item) => acc + (item?.quantity || 0), 0);
                                        const paymentDetails = getPaymentMethodDetails(order.paymentMethod);

                                        return (
                                            <tr key={order._id} className='bg-black/20 hover:bg-black/30 transition-all align-top group'>
                                                <td className='p-6 first:rounded-l-2xl'>
                                                    <span className='text-[11px] text-white/30 font-mono group-hover:text-amber-500/50 transition-colors'>#{order._id.slice(-8)}</span>
                                                </td>
                                                <td className='p-6'>
                                                    <div className='flex items-start gap-3'>
                                                        <div className='w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0'>
                                                            <FiUser className='text-amber-500/60 text-sm' />
                                                        </div>
                                                        <div>
                                                            <p className='text-sm font-bold text-amber-100 group-hover:text-amber-400 transition-colors'>{order.firstName} {order.lastName}</p>
                                                            <p className='text-[10px] text-white/30 mt-1.5 font-medium'>{order.phone}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='p-6'>
                                                    <div className='flex items-start gap-2.5 max-w-[220px]'>
                                                        <FiMapPin className='text-amber-500/40 text-sm mt-0.5 shrink-0' />
                                                        <p className='text-[11px] text-amber-100/60 leading-relaxed font-medium'>
                                                            {order.address}, {order.city} - {order.zipCode}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className='p-6'>
                                                    <div className='flex flex-col gap-3 min-w-[240px]'>
                                                        {(order.items || []).map((item, idx) => (
                                                            <div key={idx} className='flex items-center gap-4 bg-white/[0.03] p-2.5 rounded-xl border border-white/5 group-hover:border-amber-500/10 transition-all'>
                                                                <img
                                                                    src={`${API_URL}/uploads/${item.item?.imageUrl || ''}`}
                                                                    alt={item.item?.name || 'Unknown'}
                                                                    className='w-12 h-12 object-cover rounded-lg shadow-lg'
                                                                />
                                                                <div className='flex-1'>
                                                                    <p className='text-xs font-bold text-amber-500/90'>{item.item?.name || 'Unknown Item'}</p>
                                                                    <div className='flex justify-between items-center mt-1.5'>
                                                                        <span className='text-[10px] text-white/20 font-medium'>₹{item.item?.price || 0}</span>
                                                                        <span className='text-[10px] text-amber-500 font-black'>x{item.quantity}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className='p-6'>
                                                    <div className='flex items-center gap-3 text-amber-500/80'>
                                                        <div className='w-7 h-7 rounded-lg bg-amber-500/5 flex items-center justify-center'>
                                                            <FiBox className='text-sm' />
                                                        </div>
                                                        <span className='text-sm font-black'>{totalQty}</span>
                                                    </div>
                                                </td>
                                                <td className='p-6'>
                                                    <div className='flex flex-col'>
                                                        <span className='text-[10px] text-white/10 uppercase font-black mb-1'>Amount</span>
                                                        <span className='text-xl font-black text-amber-500'>₹{order.total || order.amount}</span>
                                                    </div>
                                                </td>
                                                <td className='p-6 text-center'>
                                                    <div className='flex flex-col items-center gap-3'>
                                                        <span className={`px-4 py-2 rounded-lg text-[10px] uppercase font-black border tracking-widest shadow-lg transition-all flex items-center gap-2 ${paymentDetails.class}`}>
                                                            <FiBox className='text-sm' />
                                                            {paymentDetails.label}
                                                        </span>
                                                        {order.paymentStatus === 'succeeded' && (
                                                            <div className='flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500'>
                                                                <FiCheckCircle className='text-xs' />
                                                                <span className='text-[9px] font-black uppercase tracking-widest'>Completed</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className='p-6 text-center last:rounded-r-2xl'>
                                                    <div className='flex flex-col items-center gap-2.5'>
                                                        <div className={`px-4 py-2 rounded-lg flex items-center gap-2 border transition-all ${order.status === 'delivered' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-amber-500/10 border-amber-500/30 text-amber-500'}`}>
                                                            {order.status === 'delivered' ? <FiCheckCircle className='text-sm' /> : <FiClock className='text-sm' />}
                                                            <span className='text-[10px] uppercase font-black tracking-widest'>
                                                                {order.status || 'Processing'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default MyOrderPage
