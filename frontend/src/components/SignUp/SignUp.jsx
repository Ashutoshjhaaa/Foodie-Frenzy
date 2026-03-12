import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaArrowLeft, FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const AwesomeToast = ({ message, icon }) => (
    <div className='animate-slide-in fixed bottom-6 right-6 flex items-center bg-gradient-to-br from-amber-500 to-amber-600 px-6 py-4 rounded-lg shadow-lg border-2 border-amber-300/20 z-50'>
        <span className='text-2xl mr-3 text-[#2D1B0E]'>{icon}</span>
        <span className='font-semibold text-[#2D1B0E]'>{message}</span>
    </div>
);

const SignUp = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [showToast, setShowToast] = useState({ visible: false, message: '', icon: null });
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const navigate = useNavigate();

    // FOR TOAST
    useEffect(() => {
        if(showToast.visible && (showToast.message==='Sign Up Successful!' || showToast.message==='Login Successful!')) {
            const timer = setTimeout(() => {
                setShowToast({ visible: false, message: '', icon: null });
                navigate('/');
            }, 2000)
            return () => clearTimeout(timer);

        } else if (showToast.visible) {
            const timer = setTimeout(() => {
                setShowToast({ visible: false, message: '', icon: null });
            }, 3000)
            return () => clearTimeout(timer);
        }
    }, [showToast, navigate])
        

    const toggleShowPassword = () => setShowPassword(prev => !prev);

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? `${API_URL}/api/user/login` : `${API_URL}/api/user/register`;
            const payload = isLogin ? { email: formData.email, password: formData.password } : formData;
            const res = await axios.post(endpoint, payload)

            if (res.data.success) {
                localStorage.setItem('authToken', res.data.token);
                localStorage.setItem('loginData', JSON.stringify(true));
                setShowToast({ visible: true, message: isLogin ? 'Login Successful!' : 'Sign Up Successful!', icon: <FaCheckCircle /> });
                return;
            } else {
                setShowToast({ visible: true, message: res.data.message || (isLogin ? 'Login failed' : 'Registration failed'), icon: <FaCheckCircle /> });
            }
        }
        catch (err) {
            const msg = (err.response?.data?.message || (isLogin ? 'Login failed' : 'Registration failed'));
            setShowToast({visible: true, message: msg, icon: <FaCheckCircle /> });  
        }
    }
    return (
        <div className='min-h-screen flex items-center justify-center bg-[#1a120b] p-4 relative'>
            {showToast.visible && <AwesomeToast message={showToast.message} icon={showToast.icon} />}
            
            <div className='w-full max-w-md bg-gradient-to-br from-[#2D1B0E] to-[#4a372a] p-8 rounded-2xl shadow-2xl border-2 border-amber-700/30 transform transition-all duration-300 hover:shadow-amber-500/10'>
                <div className='flex justify-center mb-6'>
                    <Link to='/' className='hover:scale-110 transition-transform duration-300'>
                        <h2 className='text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-monsieur tracking-widest drop-shadow-md'>
                            Foodie-Frenzy
                        </h2>
                    </Link>
                </div>
                
                <h1 className='text-2xl font-bold text-center text-amber-100 mb-8'>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>

                <form onSubmit={handleSubmit} className='space-y-5'>
                    {!isLogin && (
                        <div className='space-y-1'>
                            <label className='text-amber-400 text-sm ml-1 font-medium'>Username</label>
                            <input
                                type="text"
                                name='username'
                                placeholder='Choose a username'
                                value={formData.username}
                                onChange={handleChange}
                                className='w-full px-4 py-3 rounded-xl bg-[#1a120b] border-2 border-amber-900/50 text-amber-100 placeholder-amber-700/50 focus:border-amber-500 focus:outline-none transition-all duration-200'
                                required
                            />
                        </div>
                    )}

                    <div className='space-y-1'>
                        <label className='text-amber-400 text-sm ml-1 font-medium'>Email Address</label>
                        <input
                            type="email"
                            name='email'
                            placeholder='Enter your email'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full px-4 py-3 rounded-xl bg-[#1a120b] border-2 border-amber-900/50 text-amber-100 placeholder-amber-700/50 focus:border-amber-500 focus:outline-none transition-all duration-200'
                            required
                        />
                    </div>

                    <div className='space-y-1 relative'>
                        <label className='text-amber-400 text-sm ml-1 font-medium'>Password</label>
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                name='password'
                                placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                                value={formData.password}
                                onChange={handleChange}
                                className='w-full px-4 py-3 rounded-xl bg-[#1a120b] border-2 border-amber-900/50 text-amber-100 placeholder-amber-700/50 focus:border-amber-500 focus:outline-none transition-all duration-200'
                                required
                            />
                            <button
                                className='absolute inset-y-0 right-4 flex items-center text-amber-400 hover:text-amber-200 transition-colors'
                                type='button'
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='w-full py-4 bg-gradient-to-r from-amber-500 to-amber-700 text-[#2D1B0E] font-bold rounded-xl shadow-lg hover:from-amber-400 hover:to-amber-600 transform transition-all active:scale-95 group overflow-hidden relative'
                    >
                        <span className='relative z-10'>{isLogin ? 'Sign In' : 'Sign Up'}</span>
                        <div className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300'></div>
                    </button>
                </form>

                <div className='mt-6 text-center'>
                    <button 
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className='group inline-flex items-center text-amber-400 hover:text-amber-600 transition-all duration-300'
                    >
                        <FaArrowLeft className='mr-2 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300' />
                        <span className='transform group-hover:translate-x-1 transition-all duration-300'>
                            Back To Login
                        </span>
                    </button>
                </div>

                <div className='mt-8 text-center'>
                    <p className='text-amber-200/60 text-sm'>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button 
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className='text-amber-400 font-bold hover:text-amber-300 transition-colors'
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
