import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaCheckCircle, FaUser, FaLock, FaEye, FaEyeSlash, FaUserPlus, FaEnvelope } from 'react-icons/fa';
import { iconClass , inputBase} from '../../assets/dummydata';
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
const url = 'http://localhost:4000'

const Login  = ({onLoginSuccess,onClose}) => {

  const [showToast, setShowToast] = useState({ visible: false, message: '', isError: false });
  const [toastMessage, setToastMessage] = useState('Login Successful!');
  const [toastType, setToastType] = useState('success');
  const [showPasswoard, setShowPasswoard] = useState(false);
  const [FormData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem('loginData');
    if (stored) {
      setFormData(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/user/login',FormData);

      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        if (FormData.rememberMe) {
          localStorage.setItem('loginData', JSON.stringify(FormData));
        } else {
          localStorage.removeItem('loginData');
        }
        
        setToastType('success');
        setToastMessage('Login Successful!');
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          onLoginSuccess();
        }, 1500);
      } else {
        setToastType('error');
        setToastMessage(response.data.message || 'Login Failed');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      setToastType('error');
      setToastMessage(error.response?.data?.message || 'Server Error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }

  const handleChange = ({target:{name, value, type, checked}}) => {
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const toggleShowpassword = () => setShowPasswoard(prev => !prev);

  return (
    <div className='space-y-6 relative'>
      <div className={`fixed top-4 right-4 z-50 transition-all duration-300
        ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`} >

          <div className={`${toastType === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white px-4 py-3 rounded-md shadow-lg flex items-center gap-2 text-sm`}>
            <FaCheckCircle className= 'flex-shrink-0'/>
            <span>{toastMessage}</span>

          </div>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='relative'>
            <FaEnvelope className={iconClass} />
            <input type="email" name="email" placeholder='Email Address' value={FormData.email} onChange={handleChange} className={`${inputBase} pl-10 pr-4 py-3 w-full bg-[#3d2b1f] border-amber-900/50 text-amber-100 placeholder-amber-700/50 rounded-lg focus:border-amber-500 outline-none transition-all`} required/>

          </div>
               <div className='relative'>
            <FaLock className={iconClass} />
            <input type={showPasswoard ? 'text' : 'password'} name="password" placeholder='password' value={FormData.password} onChange={handleChange} className={`${inputBase} pl-10 pr-4 py-3 w-full bg-[#3d2b1f] border-amber-900/50 text-amber-100 placeholder-amber-700/50 rounded-lg focus:border-amber-500 outline-none transition-all`} required/>
            <button type='button' onClick={toggleShowpassword} className='absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400'>
              {showPasswoard ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>
          <div className='flex items-center'>
            <label className='flex items-center'>
              <input type="checkbox" name="rememberMe" checked={FormData.rememberMe} onChange={handleChange} className='form-checkbox h-5 w-5 text-amber-600 bg-[#2D1B0E] border-amber-400 rounded focus:ring-amber-400'/>
              <span className='ml-2 text-amber-100'>Remember me</span>
            </label>
          </div>
          <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-[#2D1B0E] font-bold rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform">
        
          Sign In <FaArrowRight/>
        </button>
        </form>
        <div className='text-center'>

          <Link to='/signup' onClick={onClose} className='inline-flex items-center gap-2 text-amber-400 hover:text-amber-600 transition-colors'>
            <FaUserPlus /> Create New Account
          </Link>

        </div>
      
      
    </div>
  )
}

export default Login 
