import React, { useState, useEffect } from 'react'
import { useCart } from '../../CartContext/CartContext'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyPaymentPage = () => {

    const { clearCart } = useCart();
    const { search } = useLocation();
    const navigate = useNavigate();
    const [statusMsg, setStatusMsg] = useState('Verifying Payment...')

    // GRAB TOKEN
    const token = localStorage.getItem('authToken')
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {}

    const verifyPayment = async () => {
        const params = new URLSearchParams(search);
        const session_id = params.get("session_id");

        if (!session_id) {
            setStatusMsg("No session tracking found. Redirecting...");
            setTimeout(() => navigate("/"), 2000);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4000/api/orders/confirm?session_id=${session_id}`, {
                headers: { token }
            });
            if (response.data.paymentStatus === 'succeeded' || response.data._id) {
                if (clearCart) clearCart();
                setStatusMsg("Payment Successful! Redirecting...");
                setTimeout(() => {
                    navigate("/myorder");
                }, 2000);
            } else {
                setStatusMsg("Payment Failed. Redirecting to home...");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            console.error("Verification Error:", error);
            setStatusMsg("An error occurred during verification.");
        }
    }

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='min-h-screen flex items-center justify-center text-white bg-[#0a0a0a] font-cinzel'>
            <div className='text-center'>
                <div className='w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-6'></div>
                <p className='text-xl tracking-widest uppercase'>{statusMsg}</p>
            </div>
        </div>
    )
}

export default VerifyPaymentPage
